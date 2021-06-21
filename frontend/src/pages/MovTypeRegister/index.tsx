import React, {useMemo, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import api from '../../services/api';

import Entry from '../../assets/arrow-up.svg';
import Exit from '../../assets/arrow-down.svg';

import { Container, Form, Input, Options, SaveButton, TypeIcons } from './styles';

interface MovTypeRegisterProps {
  match: {
    params: {
      id: string;
    }
  }
}

const typeIcons = [
  undefined, 
  Entry,
  Exit
];

function MovTypeRegister({ match }: MovTypeRegisterProps) {
  
  const [situation, setSituation] = useState<string>('A');
  const [description, setDescription] = useState<string>();
  const [frequency, setFrequency] = useState<string>();
  const [movType, setMovType] = useState<string>();
  const [redirect, setRedirect] = useState<boolean>(false);
  
  

  async function LoadTaskDetails(){
    if(!match.params.id){
      Clear();
    }else{
      await api.get(`/movementTypes/${match.params.id}`)
      .then(response => {
        setDescription(response.data[0].description)
        setFrequency(response.data[0].frequency === 'R' ? 'Recorrente' : 'Eventual')
        setMovType(response.data[0].mov_type === '1' ? 'Entrada' : 'Saída')
        setSituation(response.data[0].situation)
      })
    }
  }

  async function Clear(){
    console.log('limpando');
    setDescription('');
    setFrequency('');
    setMovType('');
    setSituation('');
  }


  async function Remove(){
    const res = window.confirm('Deseja realmente remover o tipo de movimentação?')
    if(res === true){
      await api.delete(`/movementTypes/${match.params.id}`)
      .then(() =>
        setRedirect(true)
      )
    }
  }

  async function Save(){
    //validação dos dados
    if(!description){
      return alert("Você precisa informar a descrição")
    }else if(!frequency){
      return alert("Você precisa selecionar a frequência")
    }else if(!movType){
      return alert("Você precisa o tipo da movimentação")
    }
    
    const formattedMovType = movType === 'Entrada' ? '1' : '2';
    const formattedFrequency = frequency === 'Recorrente' ? 'R' : 'E';

    if(match.params.id){
      await api.put(`/movementTypes/${match.params.id}`, {
        description,
        frequency: formattedFrequency,
        movType: formattedMovType,
        situation,
      }).then(() => 
        setRedirect(true)
      )

    }else{
      await api.post('/movementType', {
        description,
        frequency: formattedFrequency,
        movType: formattedMovType
      }).then(() =>
        setRedirect(true)
      )
    }

  }

    //atualizar o conteúdo a cada vez que a tela for carregada ou o filtro for atualizado
    useEffect(() => {
      LoadTaskDetails();
      setSituation('A');
    }, [match.params.id])

  return (
    <Container>
      { redirect && <Redirect to="/movementType" /> }
      <h1>Cadastro de Tipos de Movimentações</h1>
      <Form>
      <TypeIcons>
          {
            typeIcons.map((icon, index) => (
              index > 0 && 
              <button type="button" onClick={() => setMovType(String(index) === '1' ? 'Entrada' : 'Saída')}>
                <img src={icon} alt="Tipo da Movimentação"/>
              </button>
              ))
          }
        </TypeIcons>
        <Input>
            <span>Descrição</span>
            <input type="text" placeholder="Descrição" 
            onChange={e => setDescription(e.target.value)} value={description}/>
          </Input>

        <Input>
            <span>Frequência</span>
            <input type="text" placeholder="Frequência" 
            onChange={e => setFrequency(e.target.value)} value={frequency}/>
          </Input>

          <Input>
            <span>Entrada/Saída</span>
            <input type="text" placeholder="Entrada/Saída"
            onChange={e => setMovType(e.target.value)} value={movType}/>
          </Input>

          <Options>

            {match.params.id && <button type="button" onClick={Remove}>EXCLUIR</button> }

          </Options>

          <SaveButton>
            <button type="button" onClick={Save}>SALVAR</button>
          </SaveButton>

      </Form>
    </Container>
  );
};

export default MovTypeRegister;
