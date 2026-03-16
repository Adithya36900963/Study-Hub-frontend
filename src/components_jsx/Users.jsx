
import User from "./User";
import { useContext } from "react";
import ItemsContext from "../context/ItemsContext";
import AddInformation from "./AddInformation";

export default function Users() {

  const { description, data } = useContext(ItemsContext);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user && user.role === "ADMIN") {
    return (
      <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">

        {data.map((d) => (
          d.role !== "ADMIN" && (
            <User
              key={d.id}
              cardId={d.id}
              cardTitle={d.name}
              role={d.role}
              cardDescription={description(d.name)}
            />
          )
        ))}

        <AddInformation />

      </div>
    );
  }

  return <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]"></div>;
}
