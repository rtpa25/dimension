import { z } from "zod";
import { Priority, Project, Status, Tag, UserNames } from "~/utils/constants";

export const CreateTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
  assignees: z.array(z.nativeEnum(UserNames)).optional(),
  priority: z.nativeEnum(Priority).optional(),
  project: z.nativeEnum(Project).optional(),
  dueDate: z.date().optional(),
  tags: z.array(z.nativeEnum(Tag)).optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
