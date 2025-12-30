import { useEffect, useState } from "react";
import "../components_Scss/Cards.scss"
import Body from "../components_jsx/Body";
import Card from  "../components_jsx/Card"
export default function Home()
{
    const [data,setData]=useState([]);
    const url="http://localhost:8080/api/regulations";
    useEffect(()=>{
        fetch(url)
        .then(res=>{
            if(!res.ok)
                throw new Error(`HTTP error! Status: ${res.status}`);
            return res.json();
        })
        .then(data=>setData(data))
        .catch(err=>console.error("Fetch failed:", err.message))
    },[url]);
    return(
        <>
            <Body imgHeading={`Welcome to Study Hub`} 
            imgSpam={`Find study materials,syllabus pdfs and regulation updates in one place.`}
            regulation={true} />
            <div className="Cards">
            {
                data.map((d)=><Card 
                    key={d.id}
                    cardTitle={`Regulation ${d.name}`}
                    cardDescription={`Comprehensive study materials and syllabus for the ${d.name} batch. Updated for the latest academic year.`}
                    cardLink={`/api/regulation/${d.id}`}
                    cardUrlName={`View ${d.name} Materials`}
                />)
            }
            </div>
        </>
        
    );
}