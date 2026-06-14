function sortByNewest(items: any[]) {
  return items.sort(
    (a, b) =>
      Number(b.email.timestamp) -
      Number(a.email.timestamp)
  );
}

export function groupEmails(emails: any[]) {
  const safeEmails = (emails || []).filter(
    (e) => e?.email?.id && e?.analysis
  );

  const buckets = {
    actionRequired: [] as any[],
    highPriority: [] as any[],
    newsletter: [] as any[],
    others: [] as any[],
  };

  for (const item of safeEmails) {
    const priority =
      item.analysis?.priority?.toLowerCase();

    const category =
      item.analysis?.category?.toLowerCase();

    const actionRequired =
      item.analysis?.actionRequired;

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
    actionRequired: sortByNewest(
      buckets.actionRequired
    ),

    highPriority: sortByNewest(
      buckets.highPriority
    ),

    newsletter: sortByNewest(
      buckets.newsletter
    ),

    others: sortByNewest(
      buckets.others
    ),
  };
}