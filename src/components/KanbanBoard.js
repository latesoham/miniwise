import Column from "./Column";
import { useEffect, useState } from "react";

function KanbanBoard() {

  const [tickets, setTickets] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Fetch tickets from backend
  useEffect(() => {

    fetch("http://localhost:8080/tickets")
      .then((res) => res.json())
      .then((data) => {

        const organizedTickets = {
          todo: data.filter((t) => t.status === "Todo"),
          inProgress: data.filter((t) => t.status === "In Progress"),
          done: data.filter((t) => t.status === "Done"),
        };

        setTickets(organizedTickets);
      })
      .catch((err) => console.error(err));

  }, []);

  // Move ticket locally
  const moveTicket = (from, to, index) => {

    const item = tickets[from][index];

    item.status =
      to === "todo"
        ? "Todo"
        : to === "inProgress"
        ? "In Progress"
        : "Done";

    const updatedFrom = tickets[from].filter((_, i) => i !== index);

    const updatedTo = [...tickets[to], item];

    setTickets({
      ...tickets,
      [from]: updatedFrom,
      [to]: updatedTo,
    });
  };

  // Add ticket in sql
const addTicketToColumn = async (column, title, priority, tag) => {

  const status =
    column === "todo"
      ? "Todo"
      : column === "inProgress"
      ? "In Progress"
      : "Done";

  const newTicket = {
    title,
    priority,
    tag,
    status,
  };

  try {

    const response = await fetch("http://localhost:8080/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    });

    const data = await response.json();

    setTickets({
      ...tickets,
      [column]: [...tickets[column], data.ticket],
    });

  } catch (error) {
    console.error(error);
  }
};

  // Delete ticket from sql
const deleteTicket = async (column, ticketId) => {

  try {

    await fetch(`http://localhost:8080/tickets/${ticketId}`, {
      method: "DELETE",
    });

    const updated = tickets[column].filter(
      (ticket) => ticket.id !== ticketId
    );

    setTickets({
      ...tickets,
      [column]: updated,
    });

  } catch (error) {
    console.error(error);
  }
};

  // Progress calculation
  const totalTasks =
    tickets.todo.length +
    tickets.inProgress.length +
    tickets.done.length;

  const completedTasks = tickets.done.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Progress */}
      <div className="mb-6 max-w-4xl mx-auto">

        <h2 className="text-lg font-semibold mb-2">
          Progress: {progress}%
        </h2>

        <div className="w-full bg-gray-300 rounded-full h-4">

          <div
            className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-green-400 to-green-600"
            style={{ width: `${progress}%` }}
          ></div>

        </div>
      </div>

      {/* Board */}
      <div className="flex gap-8 justify-center flex-wrap max-w-7xl mx-auto">

        <Column
          title="Todo"
          tickets={tickets.todo}
          moveTicket={(i) => moveTicket("todo", "inProgress", i)}
          deleteTicket={(ticketId) => deleteTicket("todo", ticketId)}
          addTicket={(title, priority, tag) =>
            addTicketToColumn("todo", title, priority, tag)
          }
        />

        <Column
          title="In Progress"
          tickets={tickets.inProgress}
          moveTicket={(i) => moveTicket("inProgress", "done", i)}
          deleteTicket={(ticketId) => deleteTicket("inProgress", ticketId)}
          addTicket={(title, priority, tag) =>
            addTicketToColumn("inProgress", title, priority, tag)
          }
        />

        <Column
          title="Done"
          tickets={tickets.done}
          deleteTicket={(ticketId) => deleteTicket("done", ticketId)}
          addTicket={(title, priority, tag) =>
            addTicketToColumn("done", title, priority, tag)
          }
        />

      </div>
    </div>
  );
}

export default KanbanBoard;// import { tab } from "@testing-library/user-event/dist/tab";





// import Column from "./Column";
// import { useState } from "react";
// import { useEffect } from "react";

// function KanbanBoard() {
//   const [tickets, setTickets] = useState({
//           todo: [],
//           inProgress: [],
//           done: [],
        
//   });

//   useEffect(() => {
//   fetch("http://localhost:8080/tickets")
//     .then((res) => res.json())
//     .then((data) => {

//       const organizedTickets = {
//         todo: data.filter((t) => t.status === "Todo"),
//         inProgress: data.filter((t) => t.status === "In Progress"),
//         done: data.filter((t) => t.status === "Done"),
//       };

//       setTickets(organizedTickets);
//     })
//     .catch((err) => console.error(err));
// }, []);

//   // Move ticket
//   const moveTicket = (from, to, index) => {
//     const item = tickets[from][index];

//     const updatedFrom = tickets[from].filter((_, i) => i !== index);
//     const updatedTo = [...tickets[to], item];

//     setTickets({
//       ...tickets,
//       [from]: updatedFrom,
//       [to]: updatedTo,
//     });
//   };

//   // Add ticket
//   const addTicketToColumn = (column, text, priority, tag, deadline) => {
//     const newTicket = {
//       text,
//       tag,
//       deadline,
//       priority: priority || "Low",
//     };

//     setTickets({
//       ...tickets,
//       [column]: [...tickets[column], newTicket],
//     });
//   };

//   // Delete ticket
//   const deleteTicket = (column, index) => {
//     const updated = tickets[column].filter((_, i) => i !== index);

//     setTickets({
//       ...tickets,
//       [column]: updated,
//     });
//   };

//   const totalTasks =
//     tickets.todo.length + tickets.inProgress.length + tickets.done.length;

//   const completedTasks = tickets.done.length;

//   const progress =
//     totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

//   return (
//     <div className="p-6 bg-gray-100 min-h-scren">
//       {/* Progress */}
//       <div className="mb-6 max-w-4xl mx-auto">
//         <h2 className="text-lg font-semibold mb-2">Progress: {progress}%</h2>

//         <div className="w-full bg-gray-300 rounded-full h-4">
//           <div
//             className="h-3 rounded-full transition-all duration-300 bg-gradient-to-r from-green-400 to-green-600"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* Board */}
//       <div className="flex gap-8 justify-between max-w-6xl mx-auto">
//         <Column
//           title="Todo"
//           tickets={tickets.todo}
//           moveTicket={(i) => moveTicket("todo", "inProgress", i)}
//           deleteTicket={(i) => deleteTicket("todo", i)}
//           addTicket={(text, priority, tag, deadline) =>
//             addTicketToColumn("todo", text, priority, tag, deadline)
//           }
//         />

//         <Column
//           title="In Progress"
//           tickets={tickets.inProgress}
//           moveTicket={(i) => moveTicket("inProgress", "done", i)}
//           deleteTicket={(i) => deleteTicket("inProgress", i)}
//           addTicket={(text, priority, tag, deadline) =>
//             addTicketToColumn("inProgress", text, priority, tag, deadline)
//           }
//         />

//         <Column
//           title="Done"
//           tickets={tickets.done}
//           deleteTicket={(i) => deleteTicket("done", i)}
//           addTicket={(text, priority, tag, deadline) =>
//             addTicketToColumn("done", text, priority, tag, deadline)
//           }
//         />
//       </div>
//     </div>
//   );
// }

// export default KanbanBoard;
