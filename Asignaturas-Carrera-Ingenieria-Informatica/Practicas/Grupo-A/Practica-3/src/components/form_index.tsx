import Link from "next/link";
import { useEffect, useState } from "react";

const Form_Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [id] = useState<number>(0);

  const fetchData = async () => {
    try {
      const houses = await fetch(
        `https://wizard-world-api.herokuapp.com/Houses/?id=${id}`
      );

      const json = await houses.json();
      setData(json);
    } catch (error) {
      setData([{ name: "Error bajandome los personajes" }]);
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
      <title>Houses</title>
      <body>
        <div className={"formulario_index"}>
          {data &&
            data.map((house: any) => (
              <div className={"casa"}>
                <h1 className={"nombre"}>{house.name}</h1>
                <div className={"caracteristicas"}>
                  Founder: {house.founder} <br />
                  Common Room: {house.commonRoom} <br />
                  Heads of House:
                  <ul>
                    {house.heads &&
                      house.heads.map((head: any) => {
                        return (
                          <li>
                            {head.firstName} {head.lastName}
                          </li>
                        );
                      })}
                  </ul>
                  Traits:
                  <ul>
                    {house.traits &&
                      house.traits.map((trait: any) => {
                        return <li>{trait.name}</li>;
                      })}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        <Link legacyBehavior href={`/wizard`}>
          <button className={"boton"}>WIZARDS</button>
        </Link>
      </body>
    </>
  );
};

export default Form_Index;
