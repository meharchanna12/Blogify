import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function Signin(){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="flex justify-center">
                <Auth type={"signin"} />
            </div>
            <div className="invisible lg:visible">
                <Quote/>  
            </div>
        </div>
    )
}