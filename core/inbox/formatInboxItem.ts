export function formatInboxItem(item: any) {
  return {
    id: item.email.id,

    subject: item.email.subject,

    from: item.email.from,

    summary: item.analysis.summary,

    category: item.analysis.category,

    priority: item.analysis.priority,

    actionRequired:
      item.analysis.actionRequired,

    timestamp: item.email.timestamp,
  };
}