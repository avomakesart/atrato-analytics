import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { createClientLoader } from './utils';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  redis: Redis;
  res: Response;
  clientLoader: ReturnType<typeof createClientLoader>;
};
