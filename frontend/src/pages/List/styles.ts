import styled from 'styled-components';

export const Container = styled.div`

`;

export const Content = styled.div`

`;

export const ButtonNew = styled.a`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  
  background: ${props => props.theme.colors.success};

  align-content:center;
  justify-content: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  
  button {
    height: 100%;
    width: 100%;
    background: none;
    font-size: 20px;
    color: ${props => props.theme.colors.white};
    font-weight: bold;

    &:hover{
      opacity: 0.7;
    }
  }

  


`

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .tag-filter {
        font-size: 18px;
        font-weight: 500;
        background: none;
        color: ${props => props.theme.colors.white};
        margin: 0 10px;
        transition: opacity .3s;
        cursor: pointer;

        &:hover {
            opacity: .7;
        }
    }

    .tag-filter-recurrent::after {
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto;
            border-bottom: 10px solid ${props => props.theme.colors.warning};
    }
    
    .tag-filter-eventual::after {
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto;
            border-bottom: 10px solid ${props => props.theme.colors.success};
    }
`;


