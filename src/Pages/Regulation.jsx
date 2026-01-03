import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/add.jpg";
import "../components_Scss/AddInformation.scss";

export default function Regulation()
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
    const [branch,setBranch]=useState();
    const [toogle,setToogle]=useState(1);
    
    const {regulationId} =useParams();

    const url=`http://localhost:8080/api/branches/${regulationId}`;
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

    // 🔹 POST new branch
    const addData = () => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: `${branch}`
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to add regulation");
            }
            return res.json();
        })
        .then(newRegulation => {
            // ✅ Update UI immediately
            setData(prev => [...prev, newRegulation]);
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
                    cardTitle={`Branch ${d.name}`}
                    cardDescription={`Specialized materials for ${d.name}`}
                    cardLink={`/api/semester/${regulationId}/${d.id}`}
                    cardUrlName={`View ${d.name} Materials`}
                />)
            }
            <div className="addInformation">
                    { toogle===0?(<>
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            addData(branch);
                            setToogle(1)
                        }}>
                            <label>Enter Branch :</label> <input type="text"  value={branch} onChange={(e)=>setBranch(e.target.value)} required/><br />
                            <button onClick={()=>setToogle(1)}>Cancle</button>  
                            <button type="Submit">Submit</button>

                        </form>
                    </>):
                    (<>
                        <div className="title">Add Regulation</div>
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