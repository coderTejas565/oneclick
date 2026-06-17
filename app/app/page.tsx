import { ChatBox } from "@/components/chat/chat-box";

export default function CommandCenterPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <div className="w-full max-w-4xl">

        <div className="mb-8 text-center">
          <h1 className="text-5xl font-semibold">
            What can I help you with?
          </h1>
        </div>

        <ChatBox />

      </div>
    </div>
  );
}