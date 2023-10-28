import { type User, type Tag, type Task } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface TaskForViewer extends Task {
  tags: Tag[];
  assignees: User[];
}

export const columns: ColumnDef<TaskForViewer>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      return (
        <div className="text-text-default text-xs font-medium">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => {
      return (
        <div className="text-text-default text-xs font-medium">
          {row.getValue("title")}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const color =
        status === "Todo"
          ? "#ffcdcd"
          : status === "In Progress"
          ? "#ffeec4"
          : "#bbfce4";

      if (status)
        return (
          <div
            className="w-24 rounded-lg px-1 py-1 text-center text-sm"
            style={{
              backgroundColor: color,
            }}
          >
            <p className="text-xs">{status}</p>
          </div>
        );
      else return null;
    },
  },
  {
    accessorKey: "priority",
    header: () => <div className="text-left">Priority</div>,
    cell: ({ row }) => {
      const priority: string = row.getValue("priority");
      const color =
        priority === "Urgent"
          ? "#ffcdcd"
          : priority === "High"
          ? "#ffb998"
          : priority === "Medium"
          ? "#ffeec4"
          : "#bbfce4";

      if (priority)
        return (
          <div
            className="w-24 rounded-lg px-1 py-1 text-center text-sm"
            style={{
              backgroundColor: color,
            }}
          >
            <p className="text-xs">{priority}</p>
          </div>
        );
      else return null;
    },
  },
  {
    accessorKey: "project",
    header: () => <div className="text-left">Project</div>,
    cell: ({ row }) => {
      return (
        <div className="text-text-default text-xs font-medium">
          {row.getValue("project")}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: () => <div className="text-left">Tags</div>,
    cell: ({ row }) => {
      const tags: Tag[] = row.getValue("tags");

      return (
        <div className="flex w-44 flex-wrap gap-2 font-medium">
          {tags.map((tag) => {
            return (
              <p
                key={tag.id}
                className="rounded-lg bg-primary/20 px-2 py-1 text-xs"
              >
                {tag.name}
              </p>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-left">Due Date</div>,
    cell: ({ row }) => {
      const dueDate: Date = row.getValue("dueDate");
      if (dueDate === null) return null;
      const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return (
        <div className="text-text-default w-24 text-xs font-medium">
          {formattedDueDate}
        </div>
      );
    },
  },
  {
    accessorKey: "assignees",
    header: () => <div className="text-left">Assignees</div>,
    cell: ({ row }) => {
      const assignees: User[] = row.getValue("assignees");
      if (assignees === null) return null;

      return (
        <div className="flex w-32 flex-wrap gap-1 text-xs font-medium">
          {assignees.map((assignee) => {
            return (
              <Avatar key={assignee.id} className="h-8 w-8">
                <AvatarFallback>
                  {assignee.name[0] + assignee.name[1]!}
                </AvatarFallback>
              </Avatar>
            );
          })}
        </div>
      );
    },
  },
];
