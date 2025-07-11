
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


export default function Blogs(){
    const  { loading,blogs } = useBlogs();
    if(loading) {
        return <div className="flex justify-center flex-col h-full w-full">
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
        <div className="flex justify-center">
            
            <div className="max-w-xl">
            {blogs.map((blog) => (
                        <BlogCard
                            authorId = {blog.author.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"Friday, 11th July"}
                            id = {blog.id}
                        />
                    ))}
            </div>
        </div>
        </div>

    )
}