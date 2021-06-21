import styled from 'styled-components';

export const Container = styled.div`

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
    color: ${props => props.theme.colors.white};
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

export const GenerateButton = styled.div`
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

export const MenuItemLink = styled.a`
    color: ${props => props.theme.colors.white};
    text-decoration: none;

    width: 100px;
    height: 30px;

    background: ${props => props.theme.colors.success};

    margin: 7px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;
