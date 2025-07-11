import type { Blog } from "../hooks"
import Appbar from "./Appbar"
import { Avatar, stripHtml } from "./BlogCard"

export default function FullBlog({blog} : {blog : Blog}){
    return <div>
        <Appbar />
        <div className="grid grid-cols-12 px-10 w-full pt-5">
            <div className="col-span-12 md:col-span-8">
                <div className="text-3xl font-extrabold"> 
                    {blog.title}
                </div>
                <div className="text-sm mt-2 text-slate-400">
                    Posted on {blog.createdAt || "10th July, 2025"}
                </div>
                <div className="text-md pt-5 font-light flex text-justify">
                    {stripHtml(blog.content)}
                </div>
                
            </div>
            <div className="col-span-4 invisible md:visible">
                Author
                <div className="flex">
                    <div className="mx-4 mt-8">
                        {<Avatar name={blog.author.name} size="big"/>}
                    </div>
                    <div className="font-bold text-xl mt-3">
                        {blog.author.name}
                    </div>
                </div>
                <div className="mx-16 text-slate-400 text-justify text-sm">
                    Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                </div>
            </div>
        </div>
    </div>
}