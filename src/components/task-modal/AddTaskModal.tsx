import { useAutoAnimate } from "@formkit/auto-animate/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { EditorContent } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AI,
  ChevronRight,
  Enter,
  FrontendTag,
  Project,
} from "~/components/icons";
import EditorButtonGroup from "~/components/task-modal/EditorButtonGroup";
import { Button, buttonVariants } from "~/components/ui/button";
import DatePicker from "~/components/ui/datepicker";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import useAutosizeTextArea from "~/hooks/useAutoResizeTextArea";
import { useTextEditor } from "~/hooks/useTextEditor";
import { getTagIcons } from "~/lib/ui-helper";
import { api } from "~/utils/api";
import {
  type Priority as PriorityEnum,
  type Project as ProjectEnum,
  type Status,
  type Tag as TagEnum,
  type UserNames,
} from "~/utils/constants";
import { isJson } from "~/utils/helpers";
import AssigneeSelector from "./AssigneeSelector";
import PrioritySelector from "./PrioritySelector";
import ProjectSelector from "./ProjectSelector";
import StatusSelector from "./StatusSelector";
import TagsSelector from "./TagsSelector";
import toast from "react-hot-toast";
import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { cn } from "~/lib/utils";

const ctrl = new AbortController();

export default function AddTaskModal() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    watch,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<{
    title: string;
    status: Status;
    assignees: UserNames[];
    priority: PriorityEnum;
    tags: TagEnum[];
    project: ProjectEnum;
    date: Date;
  }>({
    defaultValues: {
      title: "",
      assignees: [],
      tags: [],
    },
  });

  const watchTitle = watch("title");
  const watchTags = watch("tags");
  const watchAssignees = watch("assignees");
  const watchProject = watch("project");
  const watchPriority = watch("priority");
  const watchStatus = watch("status");

  useAutosizeTextArea(textAreaRef.current, watchTitle);

  const createTaskMutation = api.task.createTask.useMutation();

  const [parent] = useAutoAnimate();

  const { editor } = useTextEditor();

  const [generatingTags, setGeneratingTags] = useState(false);
  const [submittingTask, setSubmittingTask] = useState(false);

  const fetchTagsHandler = async () => {
    setGeneratingTags(true);
    await fetchEventSource("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskTitle: watchTitle,
        taskDescription: editor?.getHTML(),
      }),
      signal: ctrl.signal,
      onmessage(ev) {
        const eventData = ev.data;
        if (isJson(eventData)) {
          const parsedData = JSON.parse(eventData) as {
            tags: TagEnum[];
            projects: ProjectEnum[];
          };

          if (parsedData.tags) {
            setValue("tags", parsedData.tags, {
              shouldDirty: true,
            });
          }
          if (parsedData.projects[0]) {
            setValue("project", parsedData.projects[0], {
              shouldDirty: true,
            });
          }
        }
      },
      onclose() {
        setGeneratingTags(false);
        ctrl.abort();
        console.log("Connection closed by the server");
      },
      onerror() {
        setGeneratingTags(false);
        toast.error("Something went wrong");
        ctrl.abort();
      },
    });
  };

  const submitTaskHandler = async () => {
    setSubmittingTask(true);
    try {
      const content = editor?.getHTML();
      await createTaskMutation.mutateAsync({
        title: watchTitle,
        description: content,
        assignees: watchAssignees,
        status: watch("status"),
        priority: watch("priority"),
        dueDate: watch("date"),
        project: watch("project"),
        tags: watchTags,
      });
      reset();
      editor?.commands.clearContent();
    } catch (error) {
      if (error instanceof TRPCError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmittingTask(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 scrollbar-hide">
      <div
        className="flex h-auto min-h-[16.9375rem] min-w-[32rem]  max-w-[50vw] flex-col rounded-[0.625rem] bg-white text-[#6C6F75] md:min-w-[44.875rem]"
        style={{
          boxShadow: "2px 2px 30px 10px rgba(0, 0, 0, 0.20)",
        }}
      >
        <div className="header mb-6 flex items-center gap-0.5 px-4 pt-4">
          <div className="flex items-center gap-1 rounded-md bg-[#F5F5F550] px-2 py-1.5">
            <FrontendTag />
            <p className="text-sm font-medium">Frontend</p>
          </div>
          <ChevronRight />
          <p className="text-sm font-medium">New Task</p>
        </div>
        <div className="inputs mb-5 px-4">
          <Textarea
            placeholder="Task title"
            className="placeholder:text-text-default h-auto max-w-full text-base font-medium"
            ref={textAreaRef}
            value={watchTitle}
            onChange={(e) => {
              setValue("title", e.target.value, {
                shouldDirty: true,
              });
            }}
          />
          <EditorContent
            editor={editor}
            ref={parent}
            className="w-full px-3 py-2 text-sm font-medium focus:outline-none focus:ring-0"
            placeholder="Describe this task..."
          />
        </div>

        <div className="tags mb-3 flex gap-3 px-7">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="-ml-2 p-0"
            onClick={fetchTagsHandler}
            disabled={generatingTags}
          >
            {generatingTags ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <AI />
            )}
          </Button>

          <div className="flex items-center gap-2" ref={parent}>
            {watchTags?.map((tag) => {
              const icon = getTagIcons(tag);
              return (
                <div
                  key={tag}
                  className="flex items-center gap-1 rounded-lg border border-dashed px-2 py-1.5"
                >
                  {icon}
                  <p className="text-text-default text-xs">{tag}</p>
                </div>
              );
            })}
            {watchProject && (
              <div className="flex items-center gap-1 rounded-lg border border-dashed px-2 py-1.5">
                <Project />
                <p className="text-text-default text-xs">{watchProject}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2 px-7">
          <StatusSelector
            value={watchStatus}
            onSelect={(value) => {
              setValue("status", value as Status, {
                shouldDirty: true,
              });
            }}
          />
          <AssigneeSelector
            onSelect={(value) => {
              const newAssignees = [...watchAssignees];
              if (newAssignees.includes(value as UserNames)) {
                newAssignees.splice(
                  newAssignees.indexOf(value as UserNames),
                  1,
                );
              } else {
                newAssignees.push(value as UserNames);
              }
              setValue("assignees", newAssignees, {
                shouldDirty: true,
              });
            }}
            value={watchAssignees}
          />
          <PrioritySelector
            onSelect={(value) => {
              setValue("priority", value as PriorityEnum, {
                shouldDirty: true,
              });
            }}
            value={watchPriority}
          />
          <TagsSelector
            onSelect={(value) => {
              const newTags = [...watchTags];
              if (newTags.includes(value as TagEnum)) {
                newTags.splice(newTags.indexOf(value as TagEnum), 1);
              } else {
                newTags.push(value as TagEnum);
              }
              setValue("tags", newTags, {
                shouldDirty: true,
              });
            }}
            value={watchTags}
          />
          <ProjectSelector
            onSelect={(value) => {
              setValue("project", value as ProjectEnum, {
                shouldDirty: true,
              });
            }}
            value={watchProject}
          />
          <DatePicker
            onSetDate={(date) => {
              setValue("date", date, {
                shouldDirty: true,
              });
            }}
            currentDate={watch("date")}
          />
        </div>
        <Separator />
        <div className="my-4 flex flex-wrap items-center justify-between px-7">
          <div className="flex gap-1">
            <EditorButtonGroup editor={editor} />
          </div>

          <Button
            disabled={!isDirty}
            onClick={submitTaskHandler}
            className="rounded-lg"
            style={{
              boxShadow: "0px 3px 0px 0px #3F2ABD",
            }}
          >
            <div className="flex items-center">
              <span>Create</span>
              <Separator
                className="mx-2 h-10 bg-white/20"
                orientation="vertical"
              />
              {submittingTask ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Enter />
              )}
            </div>
          </Button>
        </div>
      </div>
      <Link
        href="/viewer"
        className={cn(buttonVariants({ variant: "link" }))}
        target="_blank"
      >
        Click to checkout bonus assessment
      </Link>
    </main>
  );
}
