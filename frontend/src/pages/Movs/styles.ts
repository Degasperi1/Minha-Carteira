import styled from 'styled-components';

export const Container = styled.div`
  span{
    color: #707070;
    margin: 5px 0;
  }
`;

export const Form = styled.div`
    width: 50%;
    margin-bottom: 70px;
    margin-left: 22%;
`;


export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span{
    color: #707070;
    margin: 5px 0;
  }

  input {
    font-size: 16px;
    padding: 15px;
    border: none;
    border-bottom: 1px solid ${props => props.theme.colors.warning};
  }

  img {
    width: 20px;
    height: 20px;
    position: relative;
    left: 90%;  
    bottom: 30px;
  }

` 

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  span{
    color: ${props => props.theme.colors.gray};
    margin: 5px 0;
  }

  textarea {
    font-size: 16px;
    border: 1px solid ${props => props.theme.colors.warning};
  }
`


export const Options = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
    border: none;
    background: ${props => props.theme.colors.warning};
    font-size: 18px;
    cursor: pointer;

    &:hover{
      opacity: 0.7;
    }
  }

  div {
    display: flex;
    align-items: center;
    color:${props => props.theme.colors.info};
    font-weight: bold;
    font-size: 18px;
  }
`


export const SaveButton = styled.div`
  width: 100%;
  margin-top: 20px;

  button {
    width: 100%;
    background: ${props => props.theme.colors.success};
    border: none;
    font-size: 20px;
    color: ${props => props.theme.colors.white};
    font-weight: bold;
    padding: 20px;
    border-radius: 30px;
    cursor: pointer;

    &:hover{
      opacity: 0.7;
    }
  }


`

export const TypeIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .inative{
    opacity: 0.5;
  }

  button {
    border: none;
    background: ${props => props.theme.colors.secondary};
    border-radius: 50px;
    margin-right: 10px;
  }
  
  img {
    width: 50px;
    height: 50px;
    margin: 10px;
    cursor: pointer;

    svg{
      fill: ${props => props.theme.colors.white};
    }

    &:hover{
      opacity: 0.5;
    }
  }

`

export const Select = styled.select`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px 0 20px 0;

  font-size: 16px;
  padding: 15px;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.warning};
  
  
  span{
    color: #707070;
    margin: 5px 0;
  }

  select {
  }

`
