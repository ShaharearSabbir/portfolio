/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VscAdd, VscEdit, VscTrash, VscEye } from "react-icons/vsc";
import { BlogForm } from "./BlogForm";
import { toast } from "sonner";
import { Blog } from "@/generated/client/browser";

export default function BlogTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

    const fetchBlogs = async () => {
    const data = await getBlogs();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await deleteBlog(id);
    if (res.success) {
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Post purged.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">System Logs</h2>
        <Button onClick={() => { setEditingBlog(null); setIsFormOpen(true); }} className="rounded-full gap-2">
          <VscAdd /> New Entry
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-6 bg-card border border-border rounded-3xl flex justify-between items-center group hover:border-primary/50 transition-all">
            <div className="flex gap-6 items-center">
              {blog.thumbnail && (
                <img src={blog.thumbnail} alt={blog.title} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
              )}
              <div>
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <div className="flex gap-3 text-xs text-muted-foreground font-mono">
                  <span>{blog.slug}</span>
                  <span>•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  {blog.isPublished ? (
                    <Badge variant="outline" className="text-[8px] h-4 text-green-500 border-green-500/20 bg-green-500/5">Live</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[8px] h-4 text-yellow-500 border-yellow-500/20 bg-yellow-500/5">Draft</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <Button variant="ghost" size="icon" onClick={() => { setEditingBlog(blog); setIsFormOpen(true); }}>
                <VscEdit />
              </Button>
              <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(blog.id)}>
                <VscTrash />
              </Button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <div className="p-12 text-center border border-dashed rounded-3xl text-muted-foreground italic">
            No system logs recorded yet.
          </div>
        )}
      </div>

      {isFormOpen && (
        <BlogForm 
          blog={editingBlog} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={() => { setIsFormOpen(false); fetchBlogs(); }} 
        />
      )}
    </div>
  );
}
