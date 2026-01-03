import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/add.jpg";
import "../components_Scss/AddInformation.scss";

export default function Semester()
{
    const [data,setData]=useState([
        // {
        //     branchId:101,
        //     branch:"CSE"
        // },
        // {
        //     branchId:102,
        //     branch:"ECE"
        // }
    ]);
    const {regulationId,semesterId,branchId} =useParams();
     const [subject,setSubject]=useState();
    const [toogle,setToogle]=useState(1);

    const url=`http://localhost:8080/api/subjects/${regulationId}/${branchId}/${semesterId}`;
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

    // 🔹 POST new regulation
    const addData = (subject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: `${subject}`
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to add regulation");
            }
            return res.json();
        })
        .then(newSubject => {
            // ✅ Update UI immediately
            setData(prev => [...prev, newSubject]);
        })
        .catch(err => console.error("POST error:", err.message));
    };
    return(
        <>
            <Body imgHeading={`Select Your Department`} 
                        imgSpam={`Choose your specific branch to access study materials and syllabus copies for your curriculum`}
                        regulation={false} />
            
            <div className="Cards">
            {
                data.map((d)=><Card 
                    key={d.id}
                    cardTitle={`Subject ${d.name}`}
                    cardDescription={`Specialized materials for ${d.name}`}
                    cardLink={`/api/pdfs/${regulationId}/${d.id}`}
                    cardUrlName={`View ${d.name} Materials`}
                />)
            }
            <div className="addInformation">
                    { toogle===0?(<>
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            addData(subject);
                            setToogle(1)
                        }}>
                            <label>Enter Subject :</label> <input type="text"  value={subject} onChange={(e)=>setSubject(e.target.value)} required/><br />
                            <button type="button" onClick={()=>setToogle(1)}>Cancle</button>  
                            <button type="Submit">Submit</button>

                        </form>
                    </>):
                    (<>
                        <div className="title">Add Subject</div>
                        <button onClick={()=>setToogle(0)}>
                            <img
                                src={addIcon}
                                alt="Add information"
                            />
                        </button>   
                    </>)
                    }
                </div>
        </div>
        </>
        
    );
}