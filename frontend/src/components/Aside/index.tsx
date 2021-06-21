import React, {useState} from 'react';
import Toggle from '../Toggle';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdLibraryAdd, MdClose, MdMenu } from 'react-icons/md';


import logoImg from '../../assets/logo.svg'

import { 
  Container,
  Header,
  LogImg,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToggleMenu,
  ThemeToggleFooter,
}  from './styles';

import {useAuth} from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

const Aside: React.FC = () => {
  const {signOut} = useAuth();

  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened ] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);


  const handleToggleMenu = () => {
      setToggleMenuIsOpened(!toggleMenuIsOpened);
  }


  const handleChangeTheme = () => {
      setDarkTheme(!darkTheme);
      toggleTheme();
  }

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          { toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
        </ToggleMenu>

        <LogImg src={logoImg} alt="Logo Minha Carteira" />
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
      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
          <Toggle
              labelLeft="Light"
              labelRight="Dark"
              checked={darkTheme}
              onChange={handleChangeTheme}
          />
      </ThemeToggleFooter>
    </Container>
  );
}

export default Aside;
