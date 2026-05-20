"use client";

import { useEffect, useState } from "react";
import { getBlogs } from "@/actions/blog.action";
import { Badge } from "../ui/badge";
import * as m from "motion/react-client";
import Image from "next/image";
import { VscArrowRight } from "react-icons/vsc";
import { BlogDetail } from "./BlogDetail";
import { Blog } from "@/generated/client/browser";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  return (
    <section id="blog" className="py-24 bg-background/50">
      <div className="lg:ml-32 lg:mr-32 px-4 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Badge variant="outline" className="text-primary border-primary/20">
              Insights & Articles
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Engineering <span className="text-primary italic">Journal</span>
            </h2>
          </div>
        </div>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <m.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <BlogDetail post={post}>
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-border/50">
                      <Image
                        src={post.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {post.tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] font-mono uppercase text-primary">#{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium group-hover:gap-4 transition-all">
                        Read Article <VscArrowRight />
                      </div>
                    </div>
                  </div>
                </BlogDetail>
              </m.div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center border border-dashed rounded-[40px] border-border/50 bg-card/20">
            <p className="text-muted-foreground font-medium tracking-tight">The engineering journal is currently being drafted. Check back soon for deep dives into system architecture.</p>
          </div>
        )}
      </div>
    </section>
  );
}
