import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: {
    id: number;
    openId: string;
    name: string;
    email: string | null;
    loginMethod: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    lastSignedIn: Date;
  };
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  return {
    req: opts.req,
    res: opts.res,
    user: {
      id: 1,
      openId: 'local-user',
      name: 'Local User',
      email: null,
      loginMethod: null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
  };
}
