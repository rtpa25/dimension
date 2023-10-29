import { api } from "~/utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TaskViewer() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = api.task.getAllTasks.useQuery({
    limit: 10,
    skip: (page - 1) * 10,
  });

  const numberOfPages = useMemo(
    () => data?.netTaskCount && Math.ceil(data?.netTaskCount / 10),
    [data?.netTaskCount],
  );

  const [parent] = useAutoAnimate();

  return (
    <>
      <div className="container mx-auto py-10" ref={parent}>
        {data && <DataTable columns={columns} data={data.tasks} />}
        {isLoading && (
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="mx-auto animate-spin text-gray-400" size={64} />
          </div>
        )}
        {isError && (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-400">Error</p>
          </div>
        )}
      </div>
      {/* paginator */}
      {!isLoading && numberOfPages && numberOfPages > 1 ? (
        <div
          className="absolute bottom-0 left-[27%] my-4 flex w-fit items-center justify-center gap-2  rounded-2xl bg-primary/10 p-4 md:left-[35%] lg:left-[40%] xl:left-[50%] 2xl:left-[45%]"
          style={{
            backdropFilter: "blur(7px) contrast(100%)",
            WebkitBackdropFilter: "blur(7px) contrast(100%)",
          }}
        >
          <Button
            aria-label="previous page"
            size={"icon"}
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            <ChevronLeft />
          </Button>
          <span className="text-slate-500">
            {page} of {numberOfPages}
          </span>
          <Button
            aria-label="next page"
            size={"icon"}
            disabled={page === numberOfPages}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </>
  );
}
