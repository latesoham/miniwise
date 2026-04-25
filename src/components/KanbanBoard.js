import Column from "./Column";
import { useState } from "react";
import { useEffect } from "react";

function KanbanBoard() {
const [tickets, setTickets] = useState(() => {
  const saved = localStorage.getItem("miniwise-tickets");
  return saved
    ? JSON.parse(saved)
    : {
        todo: ["Learn React", "Setup Backend"],
        inProgress: ["Build UI"],
        done: ["Project Idea"],
      };
});
    useEffect(() => {
    localStorage.setItem("miniwise-tickets", JSON.stringify(tickets));
    }, [tickets]);

  // Move ticket
  const moveTicket = (from, to, index) => {
    const item = tickets[from][index];

    const updatedFrom = tickets[from].filter((_, i) => i !== index);
    const updatedTo = [...tickets[to], item];

    setTickets({
      ...tickets,
      [from]: updatedFrom,
      [to]: updatedTo,
    });
  };

  // Delete ticket
  const deleteTicket = (column, index) => {
    const updated = tickets[column].filter((_, i) => i !== index);

    setTickets({
      ...tickets,
      [column]: updated,
    });
  };

  // Add ticket
  const addTicketToColumn = (column, text) => {
    setTickets({
      ...tickets,
      [column]: [...tickets[column], text],
    });
  };

  return (
    <div className="flex gap-6 p-6">
      <Column
        title="Todo"
        tickets={tickets.todo}
        moveTicket={(i) => moveTicket("todo", "inProgress", i)}
        deleteTicket={(i) => deleteTicket("todo", i)}
        addTicket={(text) => addTicketToColumn("todo", text)}
      />

      <Column
        title="In Progress"
        tickets={tickets.inProgress}
        moveTicket={(i) => moveTicket("inProgress", "done", i)}
        deleteTicket={(i) => deleteTicket("inProgress", i)}
        addTicket={(text) => addTicketToColumn("inProgress", text)}
      />

      <Column
        title="Done"
        tickets={tickets.done}
        deleteTicket={(i) => deleteTicket("done", i)}
        addTicket={(text) => addTicketToColumn("done", text)}
      />
    </div>
  );
}

export default KanbanBoard;