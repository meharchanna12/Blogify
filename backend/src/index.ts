import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
    JWT_SECRET: string;
	}
}>();
app.use('/*', cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);
export default app;
