import './components/Body.scss'
export default function Body(props)
{
    return(
        <div className="bodyClass">
            <div className="imgBackground">
                <div className="imgHeading">Welcome to Study Hub</div>
                <div className="imgSpam">Find study materials,syllabus pdfs and regulation updates in one place.</div>
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