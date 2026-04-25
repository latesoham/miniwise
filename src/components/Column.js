import { useState } from "react";
import TicketCard from "./TicketCard";

function Column({ title, tickets, moveTicket, deleteTicket, addTicket }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTicket(input);
    setInput("");
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg w-80">
      <h2 className="font-bold mb-4">{title}</h2>

      {/* Input */}
      <div className="flex gap-2 mb-3">
        <input
          className="border p-1 rounded text-sm w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-2 rounded text-sm"
        >
          +
        </button>
      </div>

      {/* Tickets */}
      {tickets.map((ticket, index) => (
        <div key={index}>
          <TicketCard
            title={ticket}
            onDelete={() => deleteTicket(index)}
          />

          {moveTicket && (
            <button
              onClick={() => moveTicket(index)}
              className="text-xs text-blue-500 mb-2"
            >
              Move →
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Column;