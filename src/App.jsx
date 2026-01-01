import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Regulation from "./Pages/Regulation";
import NavBar from "./components_jsx/NavBar"
import Branch  from "./Pages/Branch";
import Semester from "./Pages/Semester";
import Subject from "./Pages/Subject"
export default function App()
{
    return(
        
        <BrowserRouter>
            <NavBar supervisor={false} admin={true}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/regulation/:regulationId" element={<Regulation />} />
                <Route path="/api/semester/:regulationId/:branchId" element={<Branch />} />
                <Route path="/api/subject/:regulationId/:branchId/:semesterId" element={<Semester />} />
                <Route path="/api/pdfs/:regulationId/:subjectId" element={<Subject />} />
                
            </Routes>
        </BrowserRouter>
    );
}