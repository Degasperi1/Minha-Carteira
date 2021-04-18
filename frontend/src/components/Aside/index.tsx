import React from 'react';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdLibraryAdd } from 'react-icons/md';


import logoImg from '../../assets/logo.svg'

import { Container, Header, LogoImg, MenuContainer, MenuItemLink, Title, MenuItemButton } from './styles';

import {useAuth} from '../../hooks/auth';

const Aside: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo Minha Carteira" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
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
        <MenuItemLink href="/movementType">
          <MdLibraryAdd/>
          Tipos de movimentações
        </MenuItemLink>
        <MenuItemButton onClick={signOut}>
          <MdExitToApp/>
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
