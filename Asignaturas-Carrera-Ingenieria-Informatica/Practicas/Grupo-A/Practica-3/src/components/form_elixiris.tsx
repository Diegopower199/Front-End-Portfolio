import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Form_Elixiris = () => {
  const [elixir, setElixir] = useState<any>({});
  const router = useRouter();

  const fetchData = async () => {
    try {
      const elixirId = router.query.id;
      const elixiris = await fetch(
        `https://wizard-world-api.herokuapp.com/Elixirs/${elixirId}`
      );

      const json = await elixiris.json();
      setElixir(json);
    } catch (error) {
      setElixir({ name: "Error bajandome el elixir" });
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  if (!elixir.id) {
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
      <title>{elixir.name}</title>
      <body>
        <div className={"formulario_elixires"}>
          <div className={"elixir"}>
            <h1>{elixir.name}</h1>
            <div className={"características"}>
              Effect: {elixir.effect} <br />
              Characteristics: {elixir.characteristics} <br />
              Time: {elixir.time} <br />
              Difficulty: {elixir.difficulty} <br />
              Ingredients:
              <ul>
                {elixir.ingredients &&
                  elixir.ingredients.map((ingredient: any) => {
                    return <li>{ingredient.name}</li>;
                  })}
              </ul>
              Inventors:
              <ul>
                {elixir.inventors &&
                  elixir.inventors.map((inventor: any) => {
                    return (
                      <li>
                        {inventor.firstName} {inventor.lastName}
                      </li>
                    );
                  })}
              </ul>
              Manufacturer: {elixir.manufacturer} <br />
            </div>
          </div>
        </div>
        <Link legacyBehavior href={`/`}>
          <button className={"boton"}>HOUSES</button>
        </Link>
        <Link legacyBehavior href={`/wizard`}>
          <button className={"boton"}>WIZARDS</button>
        </Link>
      </body>
    </>
  );
};

export default Form_Elixiris;
