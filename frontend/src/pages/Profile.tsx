
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs2 } from "../hooks";


export default function Profile(){
    const  { loading,blogs } = useBlogs2();
    if(loading) {
        return <div className="flex justify-center flex-col">
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
            {Array.isArray(blogs) && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogCard
                    authorId={blog.author.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"Friday, 11th July"}
                    id={blog.id}
                    />
                ))
                ) : (
                <div className="text-center text-gray-500">No blogs found.</div>
                )}

            </div>
        </div>
        </div>

    )
}