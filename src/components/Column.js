import { useState } from "react";
import TicketCard from "./TicketCard";

function Column({ title, tickets, moveTicket, deleteTicket, addTicket }) {
  // 🔹 State
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tag, setTag] = useState("React");
  const [deadline, setDeadline] = useState("");

  // 🔹 Function
  const handleAdd = () => {
    if (input.trim() === "") return;
    addTicket(input, priority, tag, deadline);
    setInput("");
  };



  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-200 w-full max-w-sm min-h-[420px] space-y-3">
      <h2 className="font-semibold text-lg mb-4 text-gray-700">{title}</h2>

      {/* 🔹 Input Section */}
      <div className="bg-gray-50 p-3 rounded-xl mb-4 shadow-sm flex flex-col gap-1.5">
        <input
          className="border p-1.5 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task"
        />

        {/* Row 2 */}
        <div className="bg-gray-50 p-3 rounded-xl mb-4 shadow-sm flex flex-col gap-1.5">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-1.5 rounded-lg text-sm bg-white hover:border-blue-400 transition"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border p-1.5 rounded-lg text-sm bg-white hover:border-blue-400 transition"
          >
            <option>React</option>
            <option>DSA</option>
            <option>Backend</option>
            <option>UI</option>
          </select>
        </div>

        {/* Row 3 */}
        <div className="bg-gray-50 p-3 rounded-xl mb-4 shadow-sm flex flex-col gap-1.5">
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-1 rounded-lg text-sm bg-white"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition transform text-white w-full py-1.5 rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* 🔹 Tickets Section */}
      {tickets.map((ticket, index) => (
        <div key={index}>
          <TicketCard
            title={ticket.text}
            priority={ticket.priority || "Low"}
            tag={ticket.tag}
            deadline={ticket.deadline}
            isDone={title === "Done"}
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
