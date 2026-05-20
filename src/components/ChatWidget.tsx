"use client";

import { useEffect, useState, useRef } from "react";
import { getOrCreateConversation, sendChatMessage } from "@/actions/chat.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VscComment, VscClose, VscSend } from "react-icons/vsc";
import * as m from "motion/react-client";
import { AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsBackToTopVisible(window.scrollY > 400);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Initial fetch
    getOrCreateConversation().then((conv) => {
      setMessages(conv.messages);
    });

    const eventSource = new EventSource("/api/chat/stream");

    eventSource.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      setMessages((prev) => {
        if (prev.find(m => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    };

    return () => eventSource.close();
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const tempMsg = { id: Date.now().toString(), sender: "guest", text: input, createdAt: new Date() };
    setMessages([...messages, tempMsg]);
    setInput("");

    try {
      await sendChatMessage(input);
      // In a real app, we might poll or use websockets to get admin replies
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <m.button
        onClick={() => setIsOpen(true)}
        initial={false}
        animate={{
          bottom: isBackToTopVisible
            ? (windowWidth < 1024 ? 160 : 112)
            : (windowWidth < 1024 ? 96 : 40)
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed right-6 lg:right-10 rounded-full shadow-2xl z-50 bg-primary text-primary-foreground hover:scale-110 w-12 h-12 flex items-center justify-center"
      >
        <VscComment size={24} />
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              bottom: isBackToTopVisible ? (windowWidth < 1024 ? 160 : 112) : (windowWidth < 1024 ? 96 : 40)
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-6 lg:right-10 w-80 sm:w-96 h-[500px] bg-card border border-border rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300"
          >
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm tracking-tight">Direct Channel</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-widest font-mono">Status: Connected</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-white">
                <VscClose size={20} />
              </Button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-background/50 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "guest" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-3xl text-sm relative group ${msg.sender === "guest"
                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/20"
                    : "bg-card text-foreground rounded-tl-none border border-border shadow-sm mt-4 pt-4"
                    }`}>
                    {msg.sender === "admin" && (
                      <div className="absolute -top-3 left-3 px-2 py-0.5 bg-background border border-border text-[9px] font-black text-primary uppercase tracking-tighter rounded-full shadow-sm z-10">
                        Shaharear
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="mt-1 text-[10px] text-muted-foreground font-mono px-2">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary rotate-3">
                    <VscComment size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold tracking-tight">Encrypted Channel Initialized</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">Your messages are sent directly to Shaharear's private dashboard. Response times vary based on system load.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-card border-t border-border flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-background rounded-full"
              />
              <Button onClick={handleSend} disabled={loading} size="icon" className="rounded-full shrink-0">
                <VscSend />
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
