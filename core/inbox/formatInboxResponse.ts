import { formatInboxItem } from "./formatInboxItem";

export function formatInboxResponse(
  groupedEmails: any
) {
  return {
    highPriority:
      groupedEmails.highPriority.map(
        formatInboxItem
      ),

    actionRequired:
      groupedEmails.actionRequired.map(
        formatInboxItem
      ),

    newsletter:
      groupedEmails.newsletter.map(
        formatInboxItem
      ),
  };
}