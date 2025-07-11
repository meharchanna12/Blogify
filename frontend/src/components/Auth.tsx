import { Link } from "react-router-dom"
import {  type SignupType } from "@meharchanna2002/common";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from 'react-toastify';

export default function Auth({type} : {type: "signup" | "signin"}){
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupType>({
        name : "",
        email : "",
        password : ""
    });
    const [loading,setLoading] = useState(false);
    async function Submit() {
        setLoading(true);
        try {

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            if(response.status >=200 && response.status <=300){
                const jwt = response.data.token;
                const id = response.data.id;
                localStorage.setItem("token", jwt);
                localStorage.setItem("id", id);
                toast.success(type === "signup" ? "Account created successfully!" : "Logged in successfully!");
                console.log("Success");
                navigate("/blogs");
                setLoading(false);
            }
            else{
                toast.error("Unexpected error occurred. Please try again.");
                setLoading(false);
            }



        } catch(e) {
            console.log(e);
            toast.error("Unexpected error occurred. Please try again.");
            setLoading(false);
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <ToastContainer />
            <div className="flex justify-center">
                <div>
                    <div>
                        <div className="text-2xl font-bold">
                        { type === "signup" ? "Create an account": "Login"}
                        </div>
                        <div className="text-slate-400 mb-4">
                            { type === "signup"? "Already have an account?" : "Don't have an account ?" }
                            { type === "signup" ? <Link to={"/signin"} className="underline pl-1">Login</Link> : <Link to={"/signup"} className="underline pl-1">Register</Link>}
                            
                        </div>
                    </div>
                    <div>
                        { type === "signup" ?(<LabelledInput label ="Name" placeholder="Mehar Channa" onChange={(e) => {
                            setPostInputs({...postInputs,name: e.target.value})
                        }}></LabelledInput> ) : null}
                        
                        <LabelledInput label ="Email" placeholder="mehar@gmail.com" onChange={(e) => {
                            setPostInputs({...postInputs,email: e.target.value})
                        }}></LabelledInput>
                        <LabelledInput label ="Password" type={"password"} placeholder="Your password" onChange={(e) => {
                            setPostInputs({...postInputs,password: e.target.value})
                        }}></LabelledInput>
                        <button
                            type="button"
                            disabled={loading}
                            onClick={Submit}
                            className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900
                                focus:outline-none focus:ring-4 focus:ring-gray-300 
                                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                                dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                                dark:border-gray-700 disabled:opacity-70 flex justify-center items-center gap-2"
                            >
                            {loading && (
                                <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                                </svg>
                            )}
                            {loading ? "Processing" : "Submit"}
                            </button>

                    </div>
                </div>
        </div>
        </div>
    )
}

interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange: (e: any) => void;
    type? : string
}
function LabelledInput({ label,placeholder,onChange,type} : LabelledInputType){
    return (
        <div>
        <label className="block mb-2 text-sm text-semibold font-medium text-black">{label}</label>
        <input onChange = {onChange} type={type || "text"} id="first_name" className="w-sm mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder={placeholder} required />

        </div>
    )


}