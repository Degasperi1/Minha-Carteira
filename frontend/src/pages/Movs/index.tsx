import React, {useMemo, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {format} from 'date-fns';

import api from '../../services/api';

import Entry from '../../assets/arrow-up.svg';
import Exit from '../../assets/arrow-down.svg';

import { Container, Form, Input, Options, SaveButton, TypeIcons } from './styles';

interface MovTypeProps {
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

function Movs({ match }: MovTypeProps) {
  
  const [type, setType] = useState<string>('1');
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [date, setDate] = useState<string>();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [user, setUser] = useState<string>();
  
  

  async function LoadTaskDetails(){
    if(!match.params.id){
      Clear();
    }else{
      await api.get(`/movements/${match.params.id}`)
      .then(response => {
        setType(response.data[0].id_movement_type)
        setDescription(response.data[0].id_movement_type)
        setAmount(response.data[0].amount)
        setDate(response.data[0].movement_date)
      })
    }
  }

  async function Clear(){
    console.log('limpando');
    setType('1');
    setDescription('');
    setDate('');
    setAmount('');
  }


  async function Remove(){
    const res = window.confirm('Deseja realmente remover a movimentação?')
    if(res === true){
      await api.delete(`/movements/${match.params.id}`)
      .then(() =>
        setRedirect(true)
      )
    }
  }

  async function Save(){
    //validação dos dados
    if(!description){
      return alert("Você precisa informar a descrição")
    }else if(!type){
      return alert("Você precisa selecionar o tipo da movimentação")
    }else if(!date){
      return alert("Você precisa definir a data da movimentação")
    }

    if(match.params.id){
      await api.put(`/movements/${match.params.id}`, {
        amount,
        movementDate: date,
        user,
        movementType: type,
      }).then(() => 
        setRedirect(true)
      )

    }else{
      console.log(
        {
          amount,
          movementDate: date,
          user,
          movementType: type
        }
      );
      await api.post('/movements', {
        amount,
        movementDate: date,
        user,
        movementType: type,
      }).then(() =>
        setRedirect(true)
      )
    }

    console.log()
  }

    //atualizar o conteúdo a cada vez que a tela for carregada ou o filtro for atualizado
    useEffect(() => {
      LoadTaskDetails();
      setUser('1');
    }, [match.params.id])

  return (
    <Container>
      { redirect && <Redirect to="/movements/type/1" /> }
      <Form>
      <TypeIcons>
          {
            typeIcons.map((icon, index) => (
              index > 0 && 
              <button type="button" onClick={() => setType(String(index))}>
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
            <span>Valor</span>
            <input type="number" placeholder="Valor" 
            onChange={e => setAmount(e.target.value)} value={amount}/>
          </Input>

          <Input>
            <span>Data</span>
            <input type="date" placeholder="Data"
            onChange={e => setDate(e.target.value)} value={date}/>
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

export default Movs;
