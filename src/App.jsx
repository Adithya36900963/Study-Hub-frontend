import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Regulation from "./Pages/Regulation";

export default function App()
{
    return(
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/regulation/:regulationId" element={<Regulation />} />
            </Routes>
        </BrowserRouter>
    );
}