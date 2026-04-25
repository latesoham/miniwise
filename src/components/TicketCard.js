function TicketCard({ title, onDelete }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow mb-3 flex justify-between items-center">
      <p className="text-sm font-medium">{title}</p>
      
      <button
        onClick={onDelete}
        className="text-red-500 text-xs"
      >
        ✕
      </button>
    </div>
  );
}

export default TicketCard;