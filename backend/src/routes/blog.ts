import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createPostInput,updatePostInput } from "@meharchanna2002/common";
export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use("/*", async (c, next) =>{
    const authHeader = c.req.header("authorization")||"";
    const token = authHeader.split(" ")[1];

    try {
        const user = await verify(token,c.env.JWT_SECRET);
        if(user) {
            c.set("userId",String(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({
                msg : "You aren't logged in"
            })
        }
    }
    catch(e){
        c.status(403);
        return c.json({
            msg : "You aren't logged in"
        })
    }
})

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const {title,content} = body;

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = createPostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({error : "Invalid input"});
    }
    try{
        const authorId = c.get("userId");
        const blogPost = await prisma.post.create({
            data : {
                 title : title,
                 content : content,
                 authorId : authorId
            }
        }) 
        return c.json({
            id : blogPost.id
        })
    }
    catch(e){
        console.log(e);
        return c.json({
            msg : "Error creating blog post"
        })
    }

})

blogRouter.put('/:id', async (c) => {

    const id = c.req.param('id');
    const body = await c.req.json();
    const {title,content} = body;
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const {success} = updatePostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({error : "Invalid input"});
    }
    const currPost = await prisma.post.findFirst({
        where : {
            id : id
        }
    });
    const userId = c.get('userId');
    if(userId !== currPost?.authorId){
        c.status(403);
        return c.json({ msg: "Not allowed to edit this post" });
    }
    const updatedPost = await prisma.post.update({
        where : {id},
        data : {
            title,
            content,
        }
    })
	return c.json({
        id : updatedPost.id
    })
})


blogRouter.delete('/:id', async (c)=>{
    const id = c.req.param('id');
    const userId = c.get('userId')
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        const currPost = await prisma.post.findFirst({
            where : {id}
        })
        if(currPost?.authorId !== userId){
            c.status(403)
            return c.json({
                msg : "You are not authorized to delete this post"
            })
        }
        const deletePost = await prisma.post.delete({
            where : {id}
        })
        return c.json({
            msg : "Post deleted"
        })
    } catch(e){
        console.log(e);
        c.status(403)
        return c.json({
            msg : "Cannot delete"
        })
    }

})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const page =  Number(c.req.query('page') || "1");
    const limit = Number(c.req.query('limit') || "10");
    const startingIndex = limit*(page-1);
    const lastIndex = startingIndex+limit;
    
    const totalPosts = await prisma.post.count();

    const blogPosts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true,
                    id : true
                }
            }
        }
    });
    const paginatedPosts = blogPosts.slice(startingIndex,lastIndex);
    return c.json({
        posts: paginatedPosts,
    });
    
})
blogRouter.get("/profile", async (c) => {
    const userId = c.get("userId");
    console.log("route hit")
    console.log("User ID in /profile route:", userId);
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
        const userPosts = await prisma.post.findMany({
            where : { authorId : userId },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });
        return c.json({
            posts : userPosts,
        })
    } catch(e){
        return c.json({
            message: "Error while fetching blog posts"
        });
    }
  });
blogRouter.get('/:id', async(c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
    
        return c.json({
            blog
        });
    } catch(e) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})
  