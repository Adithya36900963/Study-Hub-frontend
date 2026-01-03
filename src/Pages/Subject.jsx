import Card from "../components_jsx/Card";
import Body from "../components_jsx/Body";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import addIcon from "../assets/add.jpg";
import "../components_Scss/AddInformation.scss";

export default function Semester() {

    const [data, setData] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [name, setName] = useState("");
    const [toggle, setToggle] = useState(1);

    const { regulationId, subjectId } = useParams();

    const url = `http://localhost:8080/api/pdfs/${regulationId}/${subjectId}`;

    // ✅ FETCH PDF LIST
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch PDFs");
                return res.json();
            })
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, [url]);

    // ✅ UPLOAD PDF
    const addData = () => {
        if (!name || !pdf) {
            alert("Please enter name and select PDF");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pdf", pdf);

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Upload failed");
            return res.json();
        })
        .then(newPDF => {
            setData(prev => [...prev, newPDF]);
            setName("");
            setPdf(null);
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <Body
                imgHeading="Select Your Department"
                imgSpam="Choose your specific branch to access study materials and syllabus copies"
                regulation={false}
            />

            <div className="Cards">
                {data.map(d => (
                    <Card
                        key={d.id}
                        cardTitle={d.name}
                        cardDescription={`Specialized materials for ${d.name}`}
                        cardLink={`http://localhost:8080/api/pdfs/download/${d.id}`}
                        cardUrlName={`View ${d.name} PDF`}
                    />
                ))}

                <div className="addInformation">
                    {toggle === 0 ? (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addData();
                            setToggle(1);
                        }}>
                            <label>Enter PDF Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <label>Upload PDF:</label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setPdf(e.target.files[0])}
                                required
                            />

                            <button type="button" onClick={() => setToggle(1)}>
                                Cancel
                            </button>
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                        <>
                            <div className="title">Add PDF</div>
                            <button onClick={() => setToggle(0)}>
                                <img src={addIcon} alt="Add PDF" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
