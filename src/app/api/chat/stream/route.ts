import { NextRequest } from "next/server";
import { chatEvents } from "@/lib/chatEvents";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const onMessage = (data: any) => {
        // If conversationId is provided, filter events
        if (conversationId && data.conversationId !== conversationId) return;
        
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      chatEvents.on("message", onMessage);

      // Keep connection alive
      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(": keep-alive\n\n"));
      }, 30000);

      req.signal.onabort = () => {
        chatEvents.off("message", onMessage);
        clearInterval(interval);
        controller.close();
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
