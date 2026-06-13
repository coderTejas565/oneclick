export function groupEmails(emails: any[]) {
  return {
    highPriority: emails.filter(
      (email) =>
        email.analysis.priority === "High"
    ),

    actionRequired: emails.filter(
      (email) =>
        email.analysis.actionRequired
    ),

    newsletter: emails.filter(
      (email) =>
        email.analysis.category === "Newsletter"
    ),

    all: emails,
  };
}