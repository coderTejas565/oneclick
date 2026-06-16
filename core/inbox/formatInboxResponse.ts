import { formatInboxItem } from "./formatInboxItem";

export function formatInboxResponse(
  groupedEmails: any
) {
  return {
    actionRequired:
      groupedEmails.actionRequired.map(
        formatInboxItem
      ),

    replied:
      groupedEmails.replied.map(
        formatInboxItem
      ),

    highPriority:
      groupedEmails.highPriority.map(
        formatInboxItem
      ),

    newsletter:
      groupedEmails.newsletter.map(
        formatInboxItem
      ),

    others:
      groupedEmails.others.map(
        formatInboxItem
      ),
  };
}