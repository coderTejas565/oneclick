import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Email = {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
};

export default function EmailList({
  emails,
  selectedEmail,
  onSelectEmail,
}: {
  emails: Email[];
  selectedEmail: Email;
  onSelectEmail: (email: Email) => void;
}) {
  return (
    <div className="w-[380px] border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">
          Inbox
        </h2>

        <p className="text-sm text-muted-foreground">
          {emails.length} emails
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-3 space-y-2">
          {emails.map((email) => {
            const isSelected =
              selectedEmail?.id === email.id;

            return (
              <Card
                key={email.id}
                onClick={() => onSelectEmail(email)}
                className={`
                  cursor-pointer p-3 transition-all
                  hover:shadow-sm
                  ${
                    isSelected
                      ? "border-primary bg-muted"
                      : ""
                  }
                `}
              >
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-1">
                    {email.subject}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {email.from}
                  </p>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {email.body}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}