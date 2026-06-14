import { EmailCard } from "./EmailCard";

type InboxSectionProps = {
  title: string;
  items: any[];
};

export function InboxSection({
  title,
  items,
}: InboxSectionProps) {
  if (!items.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">
        {title} ({items.length})
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <EmailCard
            key={item.email.id}
            id={item.email.id}
            subject={item.email.subject}
            from={item.email.from}
            summary={item.analysis.summary}
            category={item.analysis.category}
            priority={item.analysis.priority}
            actionRequired={
              item.analysis.actionRequired
            }
          />
        ))}
      </div>
    </section>
  );
}