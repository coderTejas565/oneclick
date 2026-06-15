function sortByNewest(items: any[]) {
  return items.sort(
    (a, b) =>
      new Date(b.processedAt).getTime() -
      new Date(a.processedAt).getTime()
  );
}

export function groupEmails(emails: any[]) {
  const safeEmails = (emails || []).filter(
    (e) => e?.id
  );

  const buckets = {
    actionRequired: [] as any[],
    highPriority: [] as any[],
    newsletter: [] as any[],
    others: [] as any[],
  };

  for (const item of safeEmails) {
    const priority = item.priority?.toLowerCase();
    const category = item.category?.toLowerCase();
    const actionRequired = item.actionRequired;

    if (actionRequired === true) {
      buckets.actionRequired.push(item);
      continue;
    }

    if (priority === "high") {
      buckets.highPriority.push(item);
      continue;
    }

    if (category === "newsletter") {
      buckets.newsletter.push(item);
      continue;
    }

    buckets.others.push(item);
  }

  return {
    actionRequired: sortByNewest(buckets.actionRequired),
    highPriority: sortByNewest(buckets.highPriority),
    newsletter: sortByNewest(buckets.newsletter),
    others: sortByNewest(buckets.others),
  };
}