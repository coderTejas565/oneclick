"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import EmailList from "@/components/EmailList";
import { mockEmails } from "@/lib/mockEmails";

export default function Page() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);

  return (
    <div className="flex h-screen">
      {/* LEFT */}
      <Sidebar />

      {/* MIDDLE */}
      <EmailList
        emails={mockEmails}
        selectedEmail={selectedEmail}
        onSelectEmail={setSelectedEmail}
      />

      {/* RIGHT */}
      <div className="w-1/3 border-l p-4">
        {selectedEmail ? (
          <>
            <h2 className="font-bold text-lg">
              {selectedEmail.subject}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedEmail.from}
            </p>
            <p className="mt-4 text-gray-700">
              {selectedEmail.body}
            </p>
          </>
        ) : (
          <p className="text-gray-400">Select an email</p>
        )}
      </div>
    </div>
  );
}