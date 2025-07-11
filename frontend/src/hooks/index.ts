import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      name: string;
    };
  }
  export const useBlogs2 = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("No token found in localStorage");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Fetched profile blogs:", response.data.posts);
                setBlogs(response.data.posts || []);
            } catch (e) {
                console.error("Error fetching profile blogs:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs
    };
};

export const useBlog = ({id} : {id : string}) => {
    const [blog,setBlog] = useState<Blog>();
    const [loading,setLoading] = useState(true);
    useEffect(() =>{
        async function fetchBlogs() {
            try{
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("No token found in localStorage");
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                });
                console.log(response.data.blog);
                setBlog(response.data.blog);
                setLoading(false);
            } catch(e){
                console.log(e);
                setLoading(false);
            }

        } 
        fetchBlogs();
    },[id]);
    return {
        loading,
        blog
    }
}
export const useBlogs = ()=>{
    const [blogs,setBlogs] = useState<Blog[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() =>{
        async function fetchBlogs() {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
                console.log(response.data.posts);
                setBlogs(response.data.posts);
                setLoading(false);
            } catch(e){
                console.log(e);
                setLoading(false);
            }

        } 
        fetchBlogs();
    },[]);
    return {
        loading,
        blogs
    }
}