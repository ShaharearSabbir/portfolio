import { EventEmitter } from "events";

// Singleton event hub for chat notifications
// Note: This works in a persistent server environment (like development)
// For serverless production, a service like Pusher or Redis Pub/Sub is required.
class ChatEventHub extends EventEmitter {}

const globalAny = globalThis as typeof globalThis & {
  chatEvents?: ChatEventHub;
};
export const chatEvents = globalAny.chatEvents || new ChatEventHub();

if (process.env.NODE_ENV !== "production") {
  globalAny.chatEvents = chatEvents;
}
