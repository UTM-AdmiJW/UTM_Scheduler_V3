import { Link } from "react-router-dom";
import Icon from "./Icon";

//404 NOt Found Page

export default function NotFoundPage(){
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-16">
            <div className="mx-auto max-w-screen-sm text-center">
            <Icon  />
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something Wrong</p>
              <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <Link to="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 ">Go to Home</Link>
            </div>
        </div>
    
    );
}


