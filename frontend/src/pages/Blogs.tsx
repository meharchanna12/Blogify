
import { useEffect } from "react";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Blogs(){
    const  { loading,blogs } = useBlogs();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
          toast.warning("Login to view this page");
          const timeout = setTimeout(() => {
            navigate("/signin");
          }, 2000); 
          return () => clearTimeout(timeout);
        }
      }, [token, navigate]);
    if(loading) {
        return <div className="mt-22 flex justify-center flex-col h-full w-full">
        <div className="flex justify-center">
        <BlogSkeleton />
        </div>
        <div className="flex justify-center">
        <BlogSkeleton />
        </div>

        <div className="flex justify-center">
        <BlogSkeleton />
        </div>
        <div className="flex justify-center">
        <BlogSkeleton />
        </div>
</div>
    }
    return (
        <div>
            <Appbar />
        {token && 
            <div className="flex justify-center">
            
            <div className="max-w-xl">
            {blogs.map((blog) => (
                        <BlogCard
                            authorId = {blog.author.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            createdAt={blog.createdAt || "Invalid"}
                            id = {blog.id}
                        />
                    ))}
            </div>
        </div>
        }
        </div>

    )
}