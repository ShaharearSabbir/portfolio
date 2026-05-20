"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/generated/client/browser";

// --- Lexical Core & React Harnesses ---
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot } from "lexical";
import {
  CodeNode,
  CodeHighlightNode,
  registerCodeHighlighting,
} from "@lexical/code";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";

// --- Shared Display Theme Sync Configuration ---
const outputReaderTheme = {
  paragraph: "my-3 text-foreground/90 leading-relaxed text-base",
  heading: {
    h1: "text-4xl font-black tracking-tight mt-8 mb-4 text-foreground border-b border-border/40 pb-2",
    h2: "text-2xl font-extrabold tracking-tight mt-6 mb-3 text-foreground",
    h3: "text-xl font-bold tracking-tight mt-4 mb-2 text-foreground",
  },
  list: {
    nested: { listitem: "list-none" },
    ol: "list-decimal pl-6 my-4 space-y-2 text-foreground",
    ul: "list-disc pl-6 my-4 space-y-2 text-foreground",
    listitem: "text-base leading-relaxed",
  },
  text: {
    bold: "font-bold text-foreground",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-muted font-mono text-sm px-1.5 py-0.5 rounded text-pink-500 border border-border/60 mx-0.5",
  },
  code: "block bg-neutral-950 dark:bg-neutral-900 border border-border/80 rounded-xl p-5 font-mono text-sm my-6 overflow-x-auto leading-relaxed shadow-inner text-neutral-200",
  codeHighlight: {
    keyword: "text-pink-400 font-semibold",
    function: "text-sky-400",
    string: "text-emerald-400",
    comment: "text-neutral-500 italic",
    variable: "text-amber-400",
    number: "text-violet-400",
    operator: "text-teal-400",
    punctuation: "text-neutral-400",
    tag: "text-crimson-400",
    selector: "text-indigo-400",
    attr: "text-yellow-400 font-medium",
  },
};

// Lifecycle component handling real-time token tracking & code highlighters
function CodeHighlightPlugin(): null {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);
  return null;
}

// Target component handling structural markdown schema conversion
function InitialStateHydrator({ content }: { content: string }): null {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    if (content) {
      editor.update(() => {
        const root = $getRoot();
        if (root.getTextContent() === "") {
          $convertFromMarkdownString(content, TRANSFORMERS);
        }
      });
    }
  }, [editor, content]);
  return null;
}

export function BlogDetail({
  post,
  children,
  className,
}: {
  post: Blog;
  children: React.ReactNode;
  className?: string;
}) {
  const readerConfig = {
    namespace: "StaticLogReaderCanvas",
    theme: outputReaderTheme,
    editable: false,
    nodes: [CodeNode, CodeHighlightNode, HeadingNode, ListNode, ListItemNode],
    onError: (err: Error) => {
      console.error("Reader Runtime Interruption:", err);
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`cursor-pointer h-full ${className || ""}`}>
          {children}
        </div>
      </DialogTrigger>

      <DialogContent className="min-w-[90vw] h-[92vh] overflow-y-auto p-0 bg-background border-border select-text">
        {/* Header Display Canvas Cover */}
        <div className="relative w-full aspect-video md:aspect-21/9 bg-muted">
          <Image
            src={
              post.thumbnail ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            }
            alt={post.title}
            fill
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="px-6 md:px-20 pb-20 -mt-24 relative z-10 space-y-12">
          {/* Main Title Banner Wrapper */}
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-foreground">
                {post.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Shaharear Rahman Sabbir
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Core Code & Heading Layout Matrix */}
          <div>
            {/* Note: Removed 'prose' completely to prevent layout overrides from wiping our colors */}
            <div className="lexical-viewer-shell text-foreground/90 w-full selection:bg-primary/20">
              <LexicalComposer initialConfig={readerConfig}>
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="focus:outline-none pointer-events-text select-text" />
                  }
                  placeholder={null}
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <CodeHighlightPlugin />
                <InitialStateHydrator content={post.content} />
              </LexicalComposer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
