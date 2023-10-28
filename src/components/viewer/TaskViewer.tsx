import { api } from "~/utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function TaskViewer() {
  const { data, isLoading, isError } = api.task.getAllTasks.useQuery();

  return (
    <div className="container mx-auto py-10">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
