export default function Branch()
{
    const [data,setData]=useState([
        {
            regulationId:101,
            regulation:"R23"
        },
        {
            regulationId:102,
            regulation:"R20"
        }
    ]);
    // const url="http://localhost:3000/api/regulations";
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
        <div className="Cards">
            {
                data.map((d)=><Card 
                    key={d.regulationId}
                    cardTitle={`Regulation ${d.regulation}`}
                    cardDescription={`Comprehensive study materials and syllabus for the ${d.regulation} batch. Updated for the latest academic year.`}
                    cardLink={`/api/regulation/${d.regulationId}`}
                    cardUrlName={`View ${d.regulation} Materials`}
                />)
            }
        </div>
    );
}