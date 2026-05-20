"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/actions/stats.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VscCode, VscLayers, VscMail, VscNotebook } from "react-icons/vsc";

export default function Overview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center animate-pulse">Scanning systems...</div>;

  const stats = [
    { title: "Active Repos", value: data.stats.projects, icon: VscCode, color: "text-blue-500" },
    { title: "Tech Stack", value: data.stats.skills, icon: VscLayers, color: "text-purple-500" },
    { title: "System Logs", value: data.stats.blogs, icon: VscNotebook, color: "text-green-500" },
    { title: "Unread Transmissions", value: data.stats.unreadMessages, icon: VscMail, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-[2rem] border-none shadow-xl bg-card/50 backdrop-blur-xl group hover:scale-105 transition-all p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-4 p-6">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-5xl font-black tracking-tighter">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-tighter italic">Recent Transmissions</h3>
          <div className="space-y-3">
            {data.recentMessages.map((msg: any) => (
              <div key={msg.id} className="p-4 bg-card/30 border border-border/50 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-sm">{msg.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate w-40">{msg.subject || "No Subject"}</p>
                </div>
                <span className="text-[10px] opacity-40">{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold uppercase tracking-tighter italic">Latest Logs</h3>
          <div className="space-y-3">
            {data.recentBlogs.map((blog: any) => (
              <div key={blog.id} className="p-4 bg-card/30 border border-border/50 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                   {blog.image && <img src={blog.image} className="w-8 h-8 rounded-lg object-cover" />}
                   <div>
                    <p className="font-bold text-sm">{blog.title}</p>
                    <p className="text-[10px] text-muted-foreground">{blog.slug}</p>
                   </div>
                </div>
                <span className="text-[10px] opacity-40">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
