import { api } from "~/utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Loader2 } from "lucide-react";

export default function TaskViewer() {
  const { data, isLoading, isError } = api.task.getAllTasks.useQuery();

  return (
    <div className="container mx-auto py-10">
      {data && <DataTable columns={columns} data={data} />}
      {isLoading && (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="mx-auto h-32 w-32 animate-spin text-gray-400" />
        </div>
      )}
      {isError && (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-400">Error</p>
        </div>
      )}
    </div>
  );
}
