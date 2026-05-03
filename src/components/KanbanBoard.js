import { tab } from "@testing-library/user-event/dist/tab";
import Column from "./Column";
import { useState } from "react";
import { useEffect } from "react";

function KanbanBoard() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem("miniwise-tickets");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [
            {
              text: "Learn React",
              priority: "High",
              tag: "Frontend",
              deadline: "2026-08-10",
            },
          ],
          inProgress: [
            {
              text: "Build UI",
              priority: "Medium",
              tag: "Forntend",
              deadline: "2026-07-10",
            },
          ],
          done: [
            {
              text: "Project Idea",
              priority: "Low",
              tag: "Backend",
              deadline: "2026-06-10",
            },
          ],
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

  // Add ticket
  const addTicketToColumn = (column, text, priority, tag, deadline) => {
    const newTicket = {
      text,
      tag,
      deadline,
      priority: priority || "Low",
    };

    setTickets({
      ...tickets,
      [column]: [...tickets[column], newTicket],
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

  const totalTasks =
    tickets.todo.length + tickets.inProgress.length + tickets.done.length;

  const completedTasks = tickets.done.length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-6 bg-gray-100 min-h-scren">
      {/* Progress */}
      <div className="mb-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">Progress: {progress}%</h2>

        <div className="w-full bg-gray-300 rounded-full h-4">
          <div
            className="h-3 rounded-full transition-all duration-300 bg-gradient-to-r from-green-400 to-green-600"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-8 justify-between max-w-6xl mx-auto">
        <Column
          title="Todo"
          tickets={tickets.todo}
          moveTicket={(i) => moveTicket("todo", "inProgress", i)}
          deleteTicket={(i) => deleteTicket("todo", i)}
          addTicket={(text, priority, tag, deadline) =>
            addTicketToColumn("todo", text, priority, tag, deadline)
          }
        />

        <Column
          title="In Progress"
          tickets={tickets.inProgress}
          moveTicket={(i) => moveTicket("inProgress", "done", i)}
          deleteTicket={(i) => deleteTicket("inProgress", i)}
          addTicket={(text, priority, tag, deadline) =>
            addTicketToColumn("inProgress", text, priority, tag, deadline)
          }
        />

        <Column
          title="Done"
          tickets={tickets.done}
          deleteTicket={(i) => deleteTicket("done", i)}
          addTicket={(text, priority, tag, deadline) =>
            addTicketToColumn("done", text, priority, tag, deadline)
          }
        />
      </div>
    </div>
  );
}

export default KanbanBoard;
