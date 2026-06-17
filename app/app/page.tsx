import { ChatBox } from "@/components/chat/chat-box";
import { Sparkles } from "lucide-react";

export default function CommandCenterPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-6">

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl flex-col justify-center">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted">

              <Sparkles className="h-7 w-7" />

            </div>
          </div>


          <h1 className="text-4xl font-semibold tracking-tight">
            Command Center
          </h1>


          <p className="mt-3 text-muted-foreground">
            Tell OneClick what you need.
          </p>

        </div>


        {/* COMMAND BAR */}

        <ChatBox />


        {/* EXAMPLES */}

        <div className="mt-6 text-center">

          <p className="text-xs text-muted-foreground">
            Try:
          </p>


          <div className="mt-3 flex flex-wrap justify-center gap-2">


            <span className="rounded-full border px-3 py-1 text-xs">
              Reply to recruiter email
            </span>


            <span className="rounded-full border px-3 py-1 text-xs">
              Schedule interview
            </span>


            <span className="rounded-full border px-3 py-1 text-xs">
              Find invoice email
            </span>


            <span className="rounded-full border px-3 py-1 text-xs">
              Summarize latest email
            </span>


          </div>

        </div>


      </div>

    </div>
  );
}