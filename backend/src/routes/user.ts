import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput,signinInput } from "@meharchanna2002/common";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string
    }
}>();


userRouter.post('/signup', async (c) => {
const body = await c.req.json();
const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate())
const {success} = signupInput.safeParse(body);
if(!success){
    c.status(400);
    return c.json({ error: "invalid input" });
}
try{

    const user = await prisma.user.create({
    data: {
        email: body.email,
        name: body.name,
        password: body.password

    }
    });
    const jwt = await sign(user,c.env.JWT_SECRET);
    return c.text(jwt);
}
catch(e){

    c.status(411);
    console.log(e);
    return c.text("Invalid")
}

})
  
userRouter.post('/signin', async (c) => {
const body = await c.req.json();
const { email,password } = body;
const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
}).$extends(withAccelerate()) 
const {success} = signinInput.safeParse(body);
if(!success){
    c.status(400);
    return c.json({
        error : "Invalid input"
    })
}
try{
    const user = await prisma.user.findFirst({
    where : {
        email : email,
        password : password
    }
    });
    if(!user){
    return c.json({error : "Incorrect credentials"},403);
    }
    const jwt = await sign({id: user.id},c.env.JWT_SECRET);
    return c.text(jwt);
}
catch(e){
    console.log(e);
    c.status(411);
    return c.text("User not found");
}
})
