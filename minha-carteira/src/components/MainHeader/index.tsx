import React, {useMemo} from 'react';

import { Container, Profile, Welcome, UserName } from './styles';

import Switch from '../Toggle';

import emojis from '../../utils/emojis';

const MainHeader: React.FC = () => {

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length );
    return emojis[indice];
  }, []);

  const userName = 'Júnior Degasperi';

  return (
    <Container>
      <Switch/>
      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>{userName}</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
