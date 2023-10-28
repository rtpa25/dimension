import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateTaskSchema } from "../schemas/task.schema";
import { z } from "zod";

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
  getAllTasks: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        skip: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const tasks = await ctx.db.task.findMany({
          include: {
            tags: true,
            assignees: true,
          },
          skip: input.skip,
          take: input.limit,
        });

        const netTaskCount = await ctx.db.task.count();
        return {
          tasks,
          netTaskCount,
        };
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
