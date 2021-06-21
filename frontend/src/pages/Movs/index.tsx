import React, {useMemo, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';

import Entry from '../../assets/arrow-up.svg';
import Exit from '../../assets/arrow-down.svg';

import { Container, Form, Input, Options, SaveButton, TypeIcons, Select } from './styles';

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Movs({ match }: MovTypeProps) {
  
  const [type, setType] = useState<string>('0');
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [date, setDate] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [user, setUser] = useState<string>();
  

  const [movementTypes, setMovementTypes] = useState<any[]>([]);
  const [movs, setMovs] = useState<any[]>([]);
  
  async function loadMovements () {
    await api.get(`/movementTypes`)
      .then(response => {
        setMovementTypes(response.data)
      })
  }

  

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
    }else if(!amount){
      return alert("Você precisa selecionar o valor")
    }else if(!date){
      return alert("Você precisa definir a data da movimentação")
    }

    if(match.params.id){
      await api.put(`/movements/${match.params.id}`, {
        amount,
        movementDate: date,
        user,
        movementType: description,
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
        movementType: description,
      }).then(() =>
        setRedirect(true)
      )
    }

    console.log()
  }

    //atualizar o conteúdo a cada vez que a tela for carregada ou o filtro for atualizado
    useEffect(() => {
      LoadTaskDetails();
      loadMovements();
      const filteredData = movementTypes.filter(item => {
        return item.mov_type === type;
      });
      setMovs(filteredData);

      console.log(filteredData);
      setUser('1');
      console.log(movementTypes);
      console.log(type);
    }, [match.params.id, type])

  return (
    <Container>
      { redirect && <Redirect to="/movements/type/1" /> }
      <h1>Cadastro de Movimentações</h1>
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
        
        <span>Descrição</span>
        <Select
          name="mov-type"
          id="selectmovtype"
          onChange={e => setDescription(e.target.value)} value={description}
        >
          <option value="0"></option>
          {
            movs.map(item => (
              <option value={item.id_movement_type}>{item.description}</option>
            ))
            
          }
        </Select>


        {/* <Input>
            <span>Descrição</span>
            <input type="text" placeholder="Descrição" 
            onChange={e => setDescription(e.target.value)} value={description}/>
          </Input> */}

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
