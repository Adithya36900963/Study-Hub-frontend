import '../components_Scss/Body.scss'
export default function Body(props)
{
    return(
        <div className="bodyClass">
            <div className="imgBackground">
                <div className="imgHeading">{props.imgHeading}</div>
                <div className="imgSpam">{props.imgSpam}</div>
            </div>
            {
                (props.regulation===true)?
                (<div className='regulationContainer'>
                    <div className="regulationHeading">Acadamic Regulation</div>
                    <div className="regulationSpam">Select your academic regulation below to access the specific syllabus, credit systems, and promotional rules tailored to your batch.</div>
                </div>):null
            }
        </div>
    );
}