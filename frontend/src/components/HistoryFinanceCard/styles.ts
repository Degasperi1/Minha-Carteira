import styled from 'styled-components';


interface ITagProps {
    color: string;
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    list-style: none;
    border-radius: 10px;
    margin: 10px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    cursor: pointer;
    transition: all .3s;
    &:hover {
        opacity: .7;
        transform: translateX(10px);
    }

    > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
    }

    > div span{
        font-size: 22px;
        font-weight: 500;
    }

`;

export const Tag = styled.div<ITagProps>`
    width: 13px;
    height: 60%;
    background-color: ${props => props.color};
    position: absolute;
    left: 0;

`;
