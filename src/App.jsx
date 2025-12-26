import NavBar from './NavBar';
import Card from './Card';
import Body from './Body';
export default function App()
{
    return(
        <>
            <NavBar supervisor={true} admin={false}/>
            <Body regulation={true}/>
            <Card />
        </>
    );
}