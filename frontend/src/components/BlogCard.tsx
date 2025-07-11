import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

interface BlogCardProps {
    authorId : string;
    authorName : string;
    title : string;
    content : string;
    createdAt : string;
    id : string
}
export default function BlogCard({authorId,authorName,title,content,createdAt,id} : BlogCardProps){
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");
    console.log('userId : ' , userId);
    console.log('authorId : ', authorId);
    const token = localStorage.getItem("token");
    const handleDelete = async () => {
        try{
            const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            if(res.status >= 200 && res.status < 300){
                toast.success("Blog Deleted 🗑️!!",
                {
                    position: "top-center",
                    autoClose: false,
                    closeOnClick: false,
                    closeButton: false,
                });

                setTimeout(() => {
                window.location.reload();
                }, 1000);

                console.log("Dalited");
                navigate('/blogs');
            }
            else{
                toast.error("Try again later",
                {
                    position: "top-center",
                    autoClose: false,
                    closeOnClick: false,
                    closeButton: false,
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        }catch(e){
            console.log(e);
            toast.error("Try again later",
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
            })
            setTimeout(() => {
                window.location.reload();
                }, 1000);
        }
    };
    
    return <div className="bg-white m-4 border border-slate-200 p-4 border rounded-2xl hover:scale-105 cursor-pointer transition-transform duration-200">
        <Link to={`/blog/${id}`}>
        <div className="flex text-sm">
            <div className="flex justify-center flex-col mb-2">
                <Avatar name ={authorName}/>
            </div>
            <div className="font-extralight pl-2 mb-2 text-sm">
                {authorName} 
                
            </div>
            <div className="flex justify-center flex-col pl-2 mb-2 text-sm">
                <Circle />
            </div>
            <div className="font-thin pl-2 text-slate-500 mb-2 text-sm">
                {createdAt}
            </div>
                
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin text-sm">
            {stripHtml(content).slice(0, 200) + "..."}
            </div>

        <div className="flex justify-between pt-4 text-slate-500 text-xs font-thin">
            {`${Math.ceil(content.length/300)} min read`}

        </div>
        </Link>
        {userId === authorId &&
        <div className="flex justify-end">
            <div className="relative group flex items-center cursor-pointer">
            <svg
                onClick={() => navigate(`/edit/${id}`)}
                className=""
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
            >
                <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
            </svg>
            <span className="absolute top-6 left-0 scale-0 group-hover:scale-100 transition-transform text-xs bg-white border border-black text-black px-2 py-1 rounded-md z-10">
                Edit
            </span>
            </div>
            <div className="relative group flex items-center cursor-pointer">
            <svg onClick={handleDelete} className= "ml-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 48 48">
                <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.796625 6 11.086453 6.9162188 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.913547 6.9162187 35.202375 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 8.9726562 18 L 11.125 38.085938 C 11.425 40.887937 13.77575 43 16.59375 43 L 31.40625 43 C 34.22325 43 36.574 40.887938 36.875 38.085938 L 39.027344 18 L 8.9726562 18 z"></path>
            </svg>
            <span 
            className="absolute top-6 left-0 scale-0 group-hover:scale-100 transition-transform text-xs bg-white border border-black text-black px-2 py-1 rounded-md z-10">
                Delete
            </span>
            </div>
        </div>
        }
    </div>
    
}



export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export const stripHtml = (html: string)=>{
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  