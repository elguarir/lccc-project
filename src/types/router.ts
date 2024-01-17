import { AppRouter } from "@/server";
import { inferRouterOutputs, inferRouterInputs } from "@trpc/server";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;