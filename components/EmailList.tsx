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
    <div className="w-1/3 p-4 border-r space-y-2">
      {emails.map((email) => {
        const isSelected = selectedEmail?.id === email.id;

        return (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`p-3 rounded cursor-pointer border transition
              ${
                isSelected
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-gray-100"
              }`}
          >
            <p className="font-medium">{email.subject}</p>
            <p className="text-xs text-gray-500">{email.from}</p>
          </div>
        );
      })}
    </div>
  );
}