import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  AgendaMenu,
  BlueButton,
  ContactList,
  Menu,
  Title,
} from "../styles/myStyledComponents";

type GraphQLResponse = { getWords: { word: string }[] };

const Agenda = (props: { data: GraphQLResponse }) => {
  const mutation = gql`
    mutation ($word: String!) {
      addWord(word: $word) {
        word
      }
    }
  `;

  const [wordList, setWorldList] = useState<{ word: string }[]>(
    props.data.getWords
  );
  const [newWord, setNewWord] = useState<string>("");

  const [mutateFunction, { data, loading, error }] = useMutation(mutation);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Hay algun error y es el siguiente: {error.message}</h1>
      </>
    );
  }

  return (
    <>
      <Menu>
        <AgendaMenu>
          {wordList.length != 0 && (
            <>
              <Title>Words</Title>
              <ContactList>
                {props.data?.getWords.map((word) => {
                  return (
                    <>
                      <li>{word.word}</li>
                    </>
                  );
                })}
              </ContactList>
            </>
          )}

          <Title>Add Words</Title>
          <input
            placeholder="Word.."
            value={newWord}
            onChange={(event) => {
              setNewWord(event.target.value);
            }}
          ></input>

          <BlueButton
            onClick={() => {
              mutateFunction({ variables: { word: newWord } });
              setNewWord("");
              const newList = wordList;
              newList.push({ word: newWord });
              setWorldList(newList);
            }}
          >
            Add
          </BlueButton>
        </AgendaMenu>
      </Menu>
    </>
  );
};

export default Agenda;
