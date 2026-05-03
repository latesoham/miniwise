function TicketCard({ title, priority, tag, deadline, isDone, onDelete }) {
  const isOverdue = deadline && new Date(deadline) < new Date() && !isDone;
  const getStyle = () => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-yellow-500 text-black";
    return "bg-green-500 text-white";
  };

  const tagColor = {
    React: "border-blue-500",
    Backend: "border-red-500",
    DSA: "border-orange-500",
    UI: "border-green-500",
  };

  return (
    <div
      className={`bg-white p-3 rounded-xl shadow-sm mb-4 flex justify-between items-start 
      border-l-4 ${tagColor[tag] || "border-gray-300"}
      hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out`}
    >
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-1">#{tag}</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          📅 {deadline}
        </p>
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold mt-2 inline-block ${
            priority === "High"
              ? "bg-red-100 text-red-600"
              : priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
          }`}
        >
          {priority}
        </span>
        {isOverdue && <p className="text-xs text-red-500 mt-1">⚠ Overdue</p>}
      </div>

      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition text-sm"
      >
        ✕
      </button>
    </div>
  );
}

export default TicketCard;
