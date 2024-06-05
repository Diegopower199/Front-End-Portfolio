import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const AgendaMenu = styled.div`
  font-weight: 600;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  overflow: hidden;
  white-space: nowrap;
  border: 7px solid #3b82f6;
  border-radius: 15px;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 600px;
`;

export const ContactInfo = styled.p`
  border: 2px solid black;
  padding: 5px;
  margin: 0;
  width: 300px;
`;

export const Title = styled.h1`
  background: #3b82f6;
  color: white;
  font-weight: 700;
  padding: 20px;
  margin: 0px;
  border-radius: 15px;
`;

export const BlueButton = styled.button`
  font-weight: 600;
  border-radius: 5px;
  color: white;
  background: #3b82f6;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: darkblue;
  }
`;
