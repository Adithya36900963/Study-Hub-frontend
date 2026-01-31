import Card from "./Card";
import { useContext } from "react";
import ItemsContext from "../context/ItemsContext";
import AddInformation from "./AddInformation";

export default function Cards() {
  const { title, url, description, data } = useContext(ItemsContext);
  const user=JSON.parse(localStorage.getItem("user") || "null");
  return (
    <div className="flex flex-wrap justify-center gap-[50px] mt-[20px]">
      {data.map((d) => (
        <Card
          key={d.id}
          cardId={d.id}
          cardTitle={`${title} ${d.name}`}
          cardDescription={description(d.name)}
          cardLink={`${url}/${d.id}`}
          cardUrlName={`View ${d.name} Materials`}
        />
      ))}

      {
        (user && (user.role==="ADMIN" || user.role==="SUPERVISOR"))?(<AddInformation />):null
      }
    </div>
  );
}
