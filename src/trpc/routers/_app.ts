// import { TRPCError } from "@trpc/server";
// import { inngest } from "@/inngest/client";
// import prisma from "@/lib/db";
// import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

// export const appRouter = createTRPCRouter({
//   testAi: baseProcedure.mutation(async () => {
//     throw new TRPCError({
//       code: "BAD_REQUEST",
//       message: "Something went wrong",
//     });

//     await inngest.send({
//       name: "execute/ai",
//     });
//     return { success: true, message: "Job queued" };
//   }),

//   getworkflows: protectedProcedure.query(({ ctx }) => {
//     return prisma.workflow.findMany();
//     // console.log({userId: ctx.auth.user.id})

//     // return prisma.user.findMany({
//     //   where:{
//     //     id: ctx.auth.user.id
//     //   }
//     // });
//   }),
//   createWorkflow: protectedProcedure.mutation(async () => {
//     await inngest.send({
//       name: "test/hello.world",
//       data: {
//         email: "example@example.com",
//       },
//     });

//     return { success: true, message: "Job queued" };
//   }),
// });
// // export type definition of API
// export type AppRouter = typeof appRouter;



import { TRPCError } from "@trpc/server";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: baseProcedure.mutation(async () => {
    try {
      await inngest.send({
        name: "execute/ai",
      });

      return { success: true, message: "Job queued" };
    } catch (error) {
      console.error("Failed to trigger Inngest job:", error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to trigger AI job",
      });
    }
  }),

  getworkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "example@example.com",
      },
    });

    return { success: true, message: "Job queued" };
  }),
});

export type AppRouter = typeof appRouter;
