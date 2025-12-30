import '../components_Scss/NavBar.scss';
export default function NavBar(props) {
  return (
    <ul className="NavBar">
      <li className="logo">Study Hub</li>
      <li className="home">Home</li>
      
      {
        (!props.supervisor && !props.admin) ? (
          <>
            <li className="supervisorLogin">Supervisor Login</li>
            <li className="adminLogin">Admin Login</li>
          </>
        ) : props.supervisor ? (
          <>
            <li className="addPdfs">Add Pdfs</li>
          </>
        ) : props.admin ? (
          <>
            <li className="addPdfs">Add Pdfs</li>
            <li className='admin'>Admin</li>
          </>
        ) : null
      }

      <li className="logout">Logout</li>
    </ul>
  );
}
