import "../index.css"; 
export default function NavBar(props) {
  return (
    <div className="font-inter justify-content:space-around mt-2">
      <ul className="flex flex-row list-none gap-[30px] text-[16px]">

        {/* Logo */}
        <li className="text-[#2563EB] font-extrabold text-[24px] mx-4 w-1/2">
          Study Hub
        </li>

        {/* Home */}
        <li className="cursor-pointer">
          Home
        </li>

        {/* Conditional rendering */}
        {!props.supervisor && !props.admin ? (
          <>
            <li className="cursor-pointer">
              Supervisor Login
            </li>
            <li className="cursor-pointer">
              Admin Login
            </li>
          </>
        ) : props.supervisor ? (
          <>
            <li className="cursor-pointer">
              Add Pdfs
            </li>
          </>
        ) : props.admin ? (
          <>
            <li className="cursor-pointer">
              Add Pdfs
            </li>
            <li className="cursor-pointer">
              Admin
            </li>
          </>
        ) : null}

        {/* Logout */}
        <li className="text-red-500 cursor-pointer">
          Logout
        </li>

      </ul>
    </div>
  );
}
