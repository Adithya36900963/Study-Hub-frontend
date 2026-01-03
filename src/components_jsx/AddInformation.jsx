import addIcon from "../assets/add.jpg";
import "../components_Scss/AddInformation.scss";

export default function AddInformation(props)
{
    return(
        <div className="addInformation">
            <div className="title">{props.title}</div>
            <button onClick={props.add}>
                <img
                    src={addIcon}
                    alt="Add information"
                    
                    />
            </button>
        </div>
    );
}