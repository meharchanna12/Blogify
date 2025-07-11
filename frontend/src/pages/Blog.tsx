import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import BlogSkeleton from "../components/BlogSkeleton";

export default function Blog() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    //@ts-ignore
    const { loading, blog } = useBlog({ id });

    if (loading || !blog) {
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
           {<FullBlog blog={blog} />}
        </div>
    );
}
