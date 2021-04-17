import React from 'react';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md';


import logoImg from '../../assets/logo.svg'

import { Container, Header, LogoImg, MenuContainer, MenuItemLink, Title } from './styles';

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo Minha Carteira" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/dashboard">
          <MdDashboard/>
          Dashboard
        </MenuItemLink>
        <MenuItemLink href="/movements/type/1">
          <MdArrowUpward/>
          Entradas
        </MenuItemLink>
        <MenuItemLink href="/movements/type/2">
          <MdArrowDownward/>
          Saídas
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdExitToApp/>
          Sair
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
