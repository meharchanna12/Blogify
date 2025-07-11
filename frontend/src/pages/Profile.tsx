
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs2 } from "../hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";


export default function Profile(){
    const  { loading,blogs } = useBlogs2();
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
        return <div className="mt-22 flex justify-center flex-col">
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
            {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                    authorId={blog.author.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    createdAt={"Friday, 11th July"}
                    id={blog.id}
                    />
                ))
                ) : (
                <div className="text-center text-gray-500">No blogs found.</div>
                )}

            </div>
        </div>
        }

        </div>

    )
}