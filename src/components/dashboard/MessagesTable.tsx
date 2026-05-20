"use client";

import { useEffect, useState } from "react";
import { getMessages, markAsRead, deleteMessage } from "@/actions/message.action";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { VscMail, VscMailRead, VscTrash } from "react-icons/vsc";

export default function MessagesTable() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  };

  const handleMarkAsRead = async (id: string) => {
    const res = await markAsRead(id);
    if (res.success) {
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      toast.success("Marked as read");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages(messages.filter(m => m.id !== id));
      toast.success("Message deleted");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading transmissions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Incoming Transmissions</h2>
        <Badge variant="outline">{messages.length} Messages</Badge>
      </div>

      <div className="grid gap-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-6 rounded-2xl border transition-all ${
              msg.isRead ? "bg-card/30 border-border/50 opacity-80" : "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{msg.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{msg.email}</span>
                </div>
                <h4 className="font-medium text-primary">{msg.subject || "No Subject"}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
                <div className="pt-2 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                {!msg.isRead && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleMarkAsRead(msg.id)}
                    title="Mark as Read"
                  >
                    <VscMailRead className="text-primary" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(msg.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <VscTrash />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-12 text-center border border-dashed rounded-3xl text-muted-foreground">
            No transmissions received yet.
          </div>
        )}
      </div>
    </div>
  );
}
