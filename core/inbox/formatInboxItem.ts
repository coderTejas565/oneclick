export function formatInboxItem(item: any) {
  return {
    id: item.id,

    subject: item.subject,
    from: item.from,

    summary: item.summary,

    category: item.category,
    priority: item.priority,

    actionRequired: item.actionRequired,

    timestamp: item.processedAt,
  };
}