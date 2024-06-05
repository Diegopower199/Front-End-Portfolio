import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Form_Characteristics_Wizard = () => {
  const [wizard, setWizard] = useState<any>({});
  const router = useRouter();

  const fetchData = async () => {
    try {
      const wizardId = router.query.id;
      const wizards = await fetch(
        `https://wizard-world-api.herokuapp.com/Wizards/${wizardId}`
      );

      const json = await wizards.json();
      setWizard(json);
    } catch (error) {
      setWizard({ name: "Error bajandome el elixir" });
    }
  };

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  if (!wizard.id) {
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
      <title>
        {wizard.firstName} {wizard.lastName}
      </title>
      <body>
        <div className={"formulario_characteristics_wizards"}>
          <div className={"wizard"}>
            <h1>
              {wizard.firstName} {wizard.lastName}
            </h1>
            Elixiris
            <ul>
              {wizard.elixirs &&
                wizard.elixirs.map((elixir: any) => {
                  return (
                    <Link className={"elixiris"} href={`/elixir/${elixir.id}`}>
                      <li>{elixir.name}</li>
                    </Link>
                  );
                })}
            </ul>
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

export default Form_Characteristics_Wizard;
