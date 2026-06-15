import { EmailCard } from "./EmailCard";

type InboxSectionProps = {
  title: string;
  items: any[];
};

export function InboxSection({ title, items }: InboxSectionProps) {
  if (!items?.length) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <span className="text-sm text-muted-foreground">
          {items.length} email{items.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <EmailCard
            key={item.id}
            id={item.id}
            subject={item.subject}
            from={item.from}
            summary={item.summary}
            category={item.category}
            priority={item.priority}
            actionRequired={item.actionRequired}
          />
        ))}
      </div>
    </section>
  );
}