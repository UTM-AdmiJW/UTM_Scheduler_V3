import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import NotFoundIcon from "./NotFoundIcon";



interface INotFoundStatusViewProps {
    title?: string;
    message?: string;
}


//404 Not Found Page
export default function NotFoundStatusView({ 
    title = "Not Found", 
    message = "Sorry, we can't find that page. You'll find lots to explore on the home page." 
}: INotFoundStatusViewProps) {


    return <>
        <Box className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-16">
            <Box className="mx-auto max-w-screen-sm text-center">
                <NotFoundIcon />
                
                <p className="my-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                    Not Found
                </p>
                <p className="mb-4 text-lg font-extralight text-gray-500 ">
                    Sorry, we can't find that page. You'll find lots to explore on the home page. 
                </p>
                
                <Link to="/" >
                    <Button variant="contained" color="error">
                        Go to Home
                    </Button>
                </Link>
            </Box>
        </Box>
    </>;
}


