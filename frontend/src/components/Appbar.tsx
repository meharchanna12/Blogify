import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png"

export default function Appbar() {
    const navigate = useNavigate();
    const onPublishPage = useLocation().pathname ==="/publish";
    const [open,setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isLoggedIn = !!localStorage.getItem("token");
    const location = useLocation();
    const onEditPage = location.pathname.startsWith("/edit");
    function logout(){
        localStorage.clear();
        setOpen(false);
        navigate("/signup")
    }
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent)=>{
            if (dropdownRef.current != null && !dropdownRef.current.contains(event.target as Node)){
                setOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        }

    },[]);
    return (
        <div className="border-b border-slate-200 flex justify-between px-10 py-4 cursor-pointer">
            <div className="flex items-center">
                <Link to="/blogs" className="text-lg font-semibold">
                    <img src={logo} alt="Logo" className="h-14 w-auto" />
                </Link>
            </div>
            {isLoggedIn ? (
               
                <div className="flex item-center">
                    {   !onPublishPage && !onEditPage ?
                            (<button
                                onClick={()=>navigate("/publish")}
                                className="max-h-12 text-sm mx-12 bg-green-600 text-white px-6 py-2 rounded-3xl hover:bg-green-700"
                                >
                                Create Post
                                </button>) : null}
                <div ref={dropdownRef} onClick={() => setOpen(!open)} className="relative">
                <Avatar size="big" name="Mehar" />
    
                {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl">
                    <ul>
                        <li>
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false)
                                navigate('/profile')
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Profile
                        </button>
                        </li>
                        <li>
                        <button
                            type="button"
                            onClick={logout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                        </li>
                    </ul>
                    </div>
                )}
                </div>
                </div>
    
            ) : <Avatar size="big" name="Mehar" />
        }
            
        </div>
    );
}
