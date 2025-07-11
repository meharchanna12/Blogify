import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import BlogSkeleton from "../components/BlogSkeleton";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Blog() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // @ts-ignore
    const { loading, blog } = useBlog({ id });
    useEffect(() => {
        if (!token) {
          toast.warning("Login to view this page");
          const timeout = setTimeout(() => {
            navigate("/signin");
          }, 2000); 
          return () => clearTimeout(timeout);
        }
      }, [token, navigate]);
    if (loading || !blog) {
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
           {token && <FullBlog blog={blog} />}
        </div>
    );
}
