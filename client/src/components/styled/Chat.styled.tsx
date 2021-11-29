import styled from 'styled-components';

export const MessageReceived = styled.div`
  font-weight: 300;
  font-size: 15px;
  width: fit-content;
  max-width: 70%;
  border-radius: 10px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
  background: #f9f9f9;
  color: #333;
`;

export const MessageSended = styled.div`
  font-weight: 300;
  font-size: 15px;
  width: fit-content;
  max-width: 70%;
  border-radius: 10px;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  background: #5063c7;
  color: white;
  margin-left: auto;
`;

export const Time = styled.span`
  color: #fff !important;
  font-size: 12px;
`;

export const Section = styled.section`
  height: calc(100vh - 80px);
  font-family: 'Roboto', sans-serif;
  width: 80%;
  @media (max-width: 600px) {
    height: 100vh;
    width: 65%;
  }
`;

export const ChatSection = styled.section`
  height: calc(100vh - 150px);
  overflow-y: auto;
  width: 82%;
  padding: 0 3em;
  @media (max-width: 600px) {
    width: 90%;
    padding: 0 1em;
    height: 92vh;
  }
`;
export const Title = styled.h1`
  width: 100%;
  font-size: 1.5em;
  text-align: center;
  color: #5063c7;
`;

export const Form = styled.form`
  height: 45px;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  height: 34px;
  width: 70%;
  color: #333;
  padding: 5px 10px;
  font-size: 1rem;
  &::placeholder {
    font-size: 0.95rem;
    color: #ccc;
  }
`;

export const Button = styled.button`
  height: 100%;
  width: 80px;
  background: #5063c7;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  &:hover {
    background: #6579dd;
  }
`;
