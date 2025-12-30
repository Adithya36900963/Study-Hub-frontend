import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState } from "react";
import { useParams } from "react-router-dom";
export default function Regulation()
{
    const [data,setData]=useState([
        {
            branchId:101,
            branch:"CSE"
        },
        {
            branchId:102,
            branch:"ECE"
        }
    ]);
    const {regulationId} =useParams();

    // const url="http://localhost:8080/api/branchesd/${regulationsId}";
    // useEffect(()=>{
    //     fetch(url)
    //     .then(res=>{
    //         if(!res.ok)
    //             throw new Error(`HTTP error! Status: ${res.status}`);
    //         return res.json();
    //     })
    //     .then(data=>setData(data))
    //     .catch(err=>console.error("Fetch failed:", err.message))
    // },[url]);
    return(
        <>
            <Body imgHeading={`Select Your Department`} 
                        imgSpam={`Choose your specific branch to access study materials and syllabus copies for your curriculum`}
                        regulation={false} />
            <div>{regulationId}</div>
            <div className="Cards">
            {
                data.map((d)=><Card 
                    key={d.branchId}
                    cardTitle={`Branch ${d.branch}`}
                    cardDescription={`Specialized materials for ${d.branch}`}
                    cardLink={`/api/regulation/${d.branchId}`}
                    cardUrlName={`View ${d.branch} Materials`}
                />)
            }
        </div>
        </>
        
    );
}