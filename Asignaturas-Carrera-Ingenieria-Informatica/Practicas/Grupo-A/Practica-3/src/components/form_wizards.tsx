import Link from "next/link";
import { useEffect, useState } from "react";

const Form_Wizards = () => {
  const [data, setData] = useState<any[]>([]);
  const [id] = useState<number>(0);

  const fetchData = async () => {
    try {
      const wizards = await fetch(
        `https://wizard-world-api.herokuapp.com/Wizards/?id=${id}`
      );
      
      const json = await wizards.json();
      setData(json);
    } catch (e) {
      setData([{ firstName: "Error bajandome los personajes" }]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (data?.length === 0) {
    return (
      <>
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div className="text" data-text="Searching"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Wizards</title>
      <body>
        <div className={"formulario_wizards"}>
          {data &&
            data.map((wizard: any) => {
              return (
                <Link href={`/wizard/${wizard.id}`}>
                  <div className={"nombre_completo"}>
                    {wizard.firstName} {wizard.lastName} <br />
                  </div>
                </Link>
              );
            })}
        </div>
        <Link legacyBehavior href={`/`}>
          <button className={"boton"}>HOUSES</button>
        </Link>
      </body>
    </>
  );
};

export default Form_Wizards;
