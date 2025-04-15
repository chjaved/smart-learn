"use client";
import React from "react";

interface SidebarProps {
  chats: { id: string; question: string; answer: string }[];
  onSelectChat: (chat: { id: string; question: string; answer: string }) => void;
}

const AiTutor_Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="w-64 bg-white shadow-lg p-4 absolute left-0 top-0 bottom-0 z-20 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Previous Chats</h2>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            className="mb-4 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <p className="text-gray-800 font-semibold truncate">Q: {chat.question}</p>
            <p className="text-gray-500 text-sm truncate">A: {chat.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No previous chats found.</p>
      )}
    </div>
  );
};

export default AiTutor_Sidebar;
