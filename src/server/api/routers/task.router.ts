import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateTaskSchema } from "../schemas/task.schema";

export const taskRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const task = await ctx.db.task.create({
          data: {
            title: input.title,
            assignees: {
              createMany: {
                data: input.assignees
                  ? input.assignees.map((assignee) => {
                      return {
                        name: assignee,
                      };
                    })
                  : [],
              },
            },
            description: input.description,
            dueDate: input.dueDate,
            priority: input.priority,
            project: input.project,
            status: input.status,
            tags: {
              createMany: {
                data: input.tags
                  ? input.tags.map((tag) => {
                      return {
                        name: tag,
                      };
                    })
                  : [],
              },
            },
          },
        });
        return task;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unknown error occurred",
          });
        }
      }
    }),
  getAllTasks: publicProcedure.query(async ({ ctx }) => {
    try {
      const tasks = await ctx.db.task.findMany({
        include: {
          tags: true,
        },
      });
      return tasks;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      } else {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred",
        });
      }
    }
  }),
});
