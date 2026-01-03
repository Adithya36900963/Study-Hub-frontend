import { useEffect, useState } from "react";
import "../components_Scss/Cards.scss";
import Body from "../components_jsx/Body";
import Card from "../components_jsx/Card";
import addIcon from "../assets/add.jpg";
import "../components_Scss/AddInformation.scss";

export default function Home() {
    const [data, setData] = useState([]);

    const url = "http://localhost:8080/api/regulations";

    const [regulation,setRegulation]=useState();
    const [toogle,setToogle]=useState(1);
    // 🔹 GET all regulations
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => console.error("Fetch failed:", err.message));
    }, []);

    // 🔹 POST new regulation
    const addData = (regulation) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: `${regulation}`
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

    return (
        <>
            <Body
                imgHeading="Welcome to Study Hub"
                imgSpam="Find study materials, syllabus pdfs and regulation updates in one place."
                regulation={true}
            />

            <div className="Cards">
                {data.map(d => (
                    <Card
                        key={d.id}
                        cardTitle={`Regulation ${d.name}`}
                        cardDescription={`Comprehensive study materials and syllabus for the ${d.name} batch. Updated for the latest academic year.`}
                        cardLink={`/api/regulation/${d.id}`}
                        cardUrlName={`View ${d.name} Materials`}
                    />
                ))}

                <div className="addInformation">
                    { toogle===0?(<>
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            addData(regulation);
                            setToogle(1)
                        }}>
                            <label>Enter Regulation :</label> <input type="text"  value={regulation} onChange={(e)=>setRegulation(e.target.value)} required/><br />
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
