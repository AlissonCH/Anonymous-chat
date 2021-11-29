import styled from 'styled-components';

export const Wrapper = styled.section`
  height: calc(100vh - 72px);
  overflow-y: scroll;
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 4px 20px;
  align-items: center;
  background: #d7e4f5;
  @media (max-width: 600px) {
    height: 99vh;
    width: 35%;
  }
`;

export const Title = styled.h1`
  font-size: 1em;
  text-align: center;
  color: #5063c7;
  display: flex;
  width: 60%;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    margin-top: 65px;
    font-size: 0.9em;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 6px;
  box-sizing: border-box;
  border: 1px solid #5063c7;
  border-radius: 10px;
  font-size: 1em;
  color: #5063c7;
  height: 40px;
  outline: none;
`;

export const InputCustom = styled.input`
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 0px solid #5063c7;
  border-radius: 10px;
  font-size: 1em;
  color: #5063c7;
  outline: none;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid #5063c7;
  border-radius: 10px;
  margin-bottom: 4px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: white;
`;

export const Display = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  justify-content: space-between;
  align-items: center;
`;

export const Circle = styled.div`
  border: 2px solid black;
  border-radius: 50px;
  heigth: 25px;
  width: 22px;
  text-align: center;
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

export const Listas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Categorie = styled.div`
  width: 80%;
  background: #6579dd;
  border-radius: 10px;
  padding: 5px 5px 5px 7px;
  color: #f9f9f9;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
    color: #6579dd;
  }
`;
