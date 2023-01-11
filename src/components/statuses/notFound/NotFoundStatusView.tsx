import { Box, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

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

    const navigate = useNavigate();


    return <>
        <Box className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-16">
            <Box className="mx-auto max-w-screen-sm text-center">
                <NotFoundIcon />
                
                <p className="my-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                    { title }
                </p>
                <p className="mb-4 text-lg font-extralight text-gray-500 ">
                    { message }
                </p>
                
                <Box className="py-4">
                    <Button variant="contained" color="error" onClick={()=>{navigate(-1);}}>
                        Back Previous Page
                    </Button>

                    
                        <Button className="pl-2" variant="contained" color="error" onClick={()=>{navigate('/');}}>
                            Home Page
                            </Button>
                        
                </Box>
            </Box>
        </Box>
    </>;
}


