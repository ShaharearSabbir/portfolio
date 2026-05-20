"use client";

import { useEffect, useState, useRef } from "react";
import { getAdminConversations, getConversationMessages, adminReply } from "@/actions/chat.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { VscComment, VscSend, VscCircleFilled } from "react-icons/vsc";

export default function InboxTable() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAdminConversations().then(setConversations);
  }, []);

  useEffect(() => {
    if (!activeConv) return;

    const eventSource = new EventSource(`/api/chat/stream?conversationId=${activeConv.id}`);

    eventSource.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      setMessages((prev) => {
        if (prev.find(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    };

    eventSource.onerror = () => {
      console.error("SSE Connection Failed. Attempting reconnect...");
      eventSource.close();
    };

    return () => eventSource.close();
  }, [activeConv]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectConversation = async (conv: any) => {
    setActiveConv(conv);
    const msgs = await getConversationMessages(conv.id);
    setMessages(msgs);
  };

  const handleReply = async () => {
    if (!reply.trim() || !activeConv) return;
    const newMsg = await adminReply(activeConv.id, reply);
    setMessages([...messages, newMsg]);
    setReply("");
  };

  return (
    <div className="flex-1 w-full overflow-hidden flex border border-border rounded-[2rem] bg-card shadow-2xl min-h-0">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col bg-muted/10">
        <div className="p-6 border-b border-border">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Chat Sessions</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => selectConversation(conv)}
              className={`p-6 cursor-pointer hover:bg-primary/5 transition-all border-b border-border/50 relative ${activeConv?.id === conv.id ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{conv.sessionId.substring(0, 8)}</span>
                {conv.isOnline && <VscCircleFilled className="text-green-500 animate-pulse" />}
              </div>
              <p className="text-sm font-bold truncate mb-1">
                {conv.messages[0]?.text || "Empty Channel"}
              </p>
              <span className="text-[10px] opacity-50">{new Date(conv.updatedAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background/50">
        {activeConv ? (
          <>
            <div className="p-6 border-b border-border flex justify-between items-center bg-card/50 backdrop-blur-xl shrink-0">
              <div>
                <h3 className="font-bold text-lg">Secure Session: {activeConv.sessionId.substring(0, 8)}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-tighter">Transmission active</p>
              </div>
              <Badge variant="outline" className="text-primary border-primary/20">Chat Channel</Badge>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "admin"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-card text-foreground rounded-tl-none border border-border shadow-sm"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-border bg-card/30 flex gap-3 shrink-0">
              <Input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReply()}
                placeholder="Direct transmission..."
                className="rounded-xl h-12"
              />
              <Button onClick={handleReply} size="icon" className="h-12 w-12 rounded-xl shrink-0 shadow-lg shadow-primary/20">
                <VscSend size={20} />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4 opacity-30">
            <VscComment size={80} />
            <p className="text-sm font-bold uppercase tracking-widest">Awaiting Transmission Selection</p>
          </div>
        )}
      </div>
    </div>
  );
}
