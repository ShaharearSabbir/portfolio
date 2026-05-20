/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { createBlog, updateBlog } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  VscClose,
  VscCloudUpload,
  VscFileMedia,
  VscPaintcan,
  VscListSelection,
} from "react-icons/vsc";
import { uploadImage } from "@/utils/uploadImage";
import { toast } from "sonner";
import Image from "next/image";

// Workspace Styling Icons
import {
  VscBold,
  VscItalic,
  VscCode,
  VscEye,
  VscEdit as VscEditIcon,
} from "react-icons/vsc";

// Lexical Base Layout imports
import {
  $getRoot,
  $getSelection,
  $createParagraphNode,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

// Upgraded Lexical Selection Hooks
import { $setBlocksType, $patchStyleText } from "@lexical/selection";

// Lexical Structural Code, Rich Text, List & Markdown Parsing Nodes
import {
  CodeNode,
  CodeHighlightNode,
  registerCodeHighlighting,
} from "@lexical/code";
import {
  HeadingNode,
  $createHeadingNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";

// Custom Lexical Theme token definitions for our Tailwind Layout
const editorTheme = {
  paragraph: "lexical-paragraph my-2 text-foreground leading-relaxed",
  heading: {
    h1: "text-3xl font-black tracking-tight my-4 block text-foreground",
    h2: "text-2xl font-extrabold tracking-tight my-3 block text-foreground",
    h3: "text-xl font-bold tracking-tight my-2 block text-foreground",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal pl-5 my-2 text-foreground space-y-1",
    ul: "list-disc pl-5 my-2 text-foreground space-y-1",
    listitem: "text-sm",
  },
  text: {
    bold: "font-bold",
    italic: "italic",
    code: "bg-muted px-1.5 py-0.5 rounded font-mono text-sm text-pink-500 border border-border/40 mx-0.5",
  },
  code: "lexical-code block bg-muted p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto",
  codeHighlight: {
    keyword: "lexical-tokenKeyword text-pink-500 font-bold",
    function: "lexical-tokenFunction text-blue-500",
    string: "lexical-tokenString text-green-500",
    comment: "lexical-tokenComment text-muted-foreground italic",
    variable: "lexical-tokenVariable text-amber-500",
    operator: "lexical-tokenOperator text-cyan-500",
    punctuation: "lexical-tokenPunctuation text-slate-400",
  },
};

// Real-time syntax tracking lifecycle plugin
function CodeHighlightPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}

// Global Text Stream Value Bridge - Saves structure cleanly as Markdown syntax
function MarkdownExportPlugin({
  onChange,
}: {
  onChange: (markdown: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const markdownContent = $convertToMarkdownString(TRANSFORMERS);
        onChange(markdownContent);
      });
    });
  }, [editor, onChange]);

  return null;
}

// Hydration logic to parse Markdown back into correct Lexical nodes on edit mode load
function InitialStatePlugin({
  initialContent,
}: {
  initialContent: string;
}): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialContent) {
      editor.update(() => {
        const root = $getRoot();
        if (root.getTextContent() === "") {
          $convertFromMarkdownString(initialContent, TRANSFORMERS);
        }
      });
    }
  }, [editor, initialContent]);

  return null;
}

// Fixes heading spillover: Pressing Enter at the end of a heading automatically
// resets the layout back into a fresh, standard paragraph line block.
function AutoParagraphOnEnterPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      () => {
        let hasHandled = false;

        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection) && selection.isCollapsed()) {
            const anchorNode = selection.anchor.getNode();
            const topLevelElement = anchorNode.getTopLevelElement();

            if (
              $isHeadingNode(topLevelElement) &&
              selection.anchor.offset === anchorNode.getTextContentSize()
            ) {
              setTimeout(() => {
                editor.update(() => {
                  const postSelection = $getSelection();
                  if ($isRangeSelection(postSelection)) {
                    $setBlocksType(postSelection, () => $createParagraphNode());
                  }
                });
              }, 0);
            }
          }
        });

        return hasHandled;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}

// Control Bar Component Layout
function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [isInsertingImage, setIsInsertingImage] = useState(false);

  const formatHeading = (headingSize: "h1" | "h2" | "h3") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const applyInlineColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $patchStyleText(selection, { color: color });
      }
    });
  };

  const applyLineHeight = (height: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        $patchStyleText(selection, { "line-height": height });
      }
    });
  };

  const handleEditorImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsInsertingImage(true);
    try {
      const url = await uploadImage(file);
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          selection.insertText(`\n![Image](${url})\n`);
        }
      });
      toast.success("Image added to editor content!");
    } catch (err: any) {
      toast.error(err.message || "Failed to inject image");
    } finally {
      setIsInsertingImage(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-muted/50 border-b border-border">
      {/* Structural Block Formats Dropdown */}
      <div className="flex items-center gap-1 border border-border/60 rounded-md p-0.5 bg-background">
        <Button
          type="button"
          variant="ghost"
          className="h-7 px-2 text-xs font-bold gap-1"
          onClick={formatParagraph}
          title="Normal Paragraph"
        >
          P
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-7 h-7"
          onClick={() => formatHeading("h1")}
          title="Heading 1"
        >
          <span className="font-black text-xs">H1</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-7 h-7"
          onClick={() => formatHeading("h2")}
          title="Heading 2"
        >
          <span className="font-extrabold text-xs">H2</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="w-7 h-7"
          onClick={() => formatHeading("h3")}
          title="Heading 3"
        >
          <span className="font-bold text-xs">H3</span>
        </Button>
      </div>

      <div className="w-[1px] h-6 bg-border mx-0.5" />

      {/* Inline Formatting Controls */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title="Bold"
      >
        <VscBold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title="Italic"
      >
        <VscItalic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        title="Inline Code"
      >
        <VscCode size={16} />
      </Button>

      <div className="w-[1px] h-6 bg-border mx-0.5" />

      {/* Line Spacing Engine (Line Height Rules) */}
      <div className="flex items-center gap-0.5 border border-border/60 rounded-md p-0.5 bg-background text-xs font-mono font-bold">
        <VscListSelection size={14} className="text-muted-foreground mx-1" />
        <button
          type="button"
          onClick={() => applyLineHeight("1.2")}
          className="px-1.5 py-0.5 rounded hover:bg-muted"
          title="Tight (1.2)"
        >
          1.2
        </button>
        <button
          type="button"
          onClick={() => applyLineHeight("1.6")}
          className="px-1.5 py-0.5 rounded hover:bg-muted"
          title="Normal (1.6)"
        >
          1.6
        </button>
        <button
          type="button"
          onClick={() => applyLineHeight("2.0")}
          className="px-1.5 py-0.5 rounded hover:bg-muted"
          title="Double (2.0)"
        >
          2.0
        </button>
      </div>

      <div className="w-[1px] h-6 bg-border mx-0.5" />

      {/* Dynamic Hex Colors Engine */}
      <div className="flex items-center gap-1 border border-border/60 rounded-md px-1 h-8 bg-background">
        <VscPaintcan size={14} className="text-muted-foreground mr-1" />
        {[
          { name: "Default", value: "" },
          { name: "Primary", value: "#3b82f6" },
          { name: "Emerald", value: "#10b981" },
          { name: "Rose", value: "#f43f5e" },
          { name: "Amber", value: "#f59e0b" },
        ].map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => applyInlineColor(color.value)}
            className="w-3.5 h-3.5 rounded-full border border-border transition-transform hover:scale-110"
            style={{ backgroundColor: color.value || "#fff" }}
            title={color.name}
          />
        ))}
      </div>

      <div className="w-[1px] h-6 bg-border mx-0.5" />

      {/* Inline Canvas Image Dropper */}
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isInsertingImage}
          className="h-8 text-xs font-bold gap-1.5 border-dashed"
        >
          <VscFileMedia size={14} />
          {isInsertingImage ? "Uploading..." : "Insert Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleEditorImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
        </Button>
      </div>
    </div>
  );
}

export function BlogForm({ blog, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(blog?.thumbnail || "");
  const [title, setTitle] = useState(blog?.title || "");
  const [slug, setSlug] = useState(blog?.slug || "");
  const [content, setContent] = useState(blog?.content || "");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Multi-Node Configuration Pipeline explicitly registering List dependencies
  const initialConfig = {
    namespace: "SystemLogEditor",
    theme: editorTheme,
    nodes: [CodeNode, CodeHighlightNode, HeadingNode, ListNode, ListItemNode],
    onError: (error: Error) => {
      console.error("Lexical Runtime Error:", error);
    },
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!blog) {
      setSlug(
        val
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      toast.success("Image uploaded to IMGBB");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("content", content);
    formData.append("thumbnail", imageUrl);
    formData.append("isPublished", "true");

    const res = blog
      ? await updateBlog(blog.id, formData)
      : await createBlog(formData);

    if (res.success) {
      toast.success(res.message);
      onSuccess();
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-[2rem] shadow-2xl">
        <div className="sticky top-0 bg-card/80 backdrop-blur-md p-6 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold uppercase tracking-tighter">
            {blog ? "Modify Production Log" : "Initialize System Terminal"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <VscClose size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Log Title</Label>
              <Input
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
                placeholder="Post Title"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Access Slug</Label>
              <Input
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="post-slug"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags (Comma separated)</Label>
            <Input
              name="tags"
              defaultValue={
                Array.isArray(blog?.tags)
                  ? blog.tags.join(", ")
                  : blog?.tags || ""
              }
              placeholder="React, Systems, Next.js"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex gap-4 items-center">
              <div className="flex-1 border-2 border-dashed border-border rounded-2xl p-4 text-center group hover:border-primary/50 transition-all relative overflow-hidden h-32 flex flex-col items-center justify-center gap-2">
                {imageUrl ? (
                  <>
                    <Image
                      width={1000}
                      height={1000}
                      src={imageUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    <span className="relative text-xs font-mono truncate max-w-xs">
                      {imageUrl}
                    </span>
                  </>
                ) : (
                  <>
                    <VscCloudUpload
                      size={24}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">
                      Upload to IMGBB
                    </span>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              {uploading && (
                <div className="text-xs animate-pulse text-primary font-bold">
                  Uploading...
                </div>
              )}
            </div>
          </div>

          {/* Lexical Workspace Module Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-black tracking-tighter uppercase italic">
                Transmission Content
              </Label>
              <div className="flex bg-muted rounded-lg p-1 gap-1">
                <Button
                  type="button"
                  variant={activeTab === "edit" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("edit")}
                  className="rounded-md gap-2 h-8 px-4 text-xs font-bold"
                >
                  <VscEditIcon /> Editor
                </Button>
                <Button
                  type="button"
                  variant={activeTab === "preview" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("preview")}
                  className="rounded-md gap-2 h-8 px-4 text-xs font-bold"
                >
                  <VscEye /> Output View
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <LexicalComposer initialConfig={initialConfig}>
                {activeTab === "edit" ? (
                  <div className="relative">
                    <EditorToolbar />
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable className="lexical-editor min-h-[450px] p-6 text-sm focus:outline-none prose dark:prose-invert max-w-none" />
                      }
                      placeholder={
                        <div className="absolute top-[72px] left-6 text-muted-foreground/50 pointer-events-none text-sm select-none">
                          Begin typing log content...
                        </div>
                      }
                      ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <CodeHighlightPlugin />
                    <MarkdownExportPlugin onChange={setContent} />
                    <InitialStatePlugin initialContent={blog?.content || ""} />
                    <AutoParagraphOnEnterPlugin />
                  </div>
                ) : (
                  <div className="p-6 min-h-[500px] overflow-y-auto prose dark:prose-invert max-w-none bg-background/40">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {content || "No log content parsed yet."}
                    </div>
                  </div>
                )}
              </LexicalComposer>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-full px-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
              className="rounded-full px-12 shadow-lg shadow-primary/20"
            >
              {loading
                ? "Transmitting..."
                : blog
                  ? "Commit Changes"
                  : "Deploy Log"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
