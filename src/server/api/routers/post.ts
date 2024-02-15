import { z } from "zod";
import { eq } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts, tareas } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ctx, input}) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const tareaId = input
      const tareaABorrar = ctx.db.query.tareas.findFirst({
        where: (tareas, {eq}) => eq(tareas.id, tareaId)
      })
      //await ctx.db.delete(tareas).values(tareaABorrar)
      await ctx.db.delete(tareas).where(eq(tareas.id, tareaId))
      console.log(tareaABorrar)
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(tareas).values({
        name: input.name,
        createdById: ctx.session.user.id,
        createdAt: new Date(), //hora actual
      });
    }),

  getLatest: publicProcedure.query(({ctx}) => {
    const userId = ctx.session?.user.id;
    const tasks = ctx.db.query.tareas.findMany({
      where: (tareas, {eq}) => eq(tareas.createdById, userId)
    });

    return tasks;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
