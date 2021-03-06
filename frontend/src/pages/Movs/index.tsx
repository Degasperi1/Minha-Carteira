import React, {useMemo, useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';

import Entry from '../../assets/arrow-up.svg';
import Exit from '../../assets/arrow-down.svg';

import formatDate from '../../utils/formatNewDate';

import { Container, Form, Input, Options, SaveButton, TypeIcons, Select, Checkbox, CheckboxLabel } from './styles';

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
  const [quantity, setQuantity] = useState<string>('1');
  const [option, setOption] = useState<string>('0');
  const [optionPart, setOptionPart] = useState<string>('0');
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
    const res = window.confirm('Deseja realmente remover a movimenta????o?')
    if(res === true){
      await api.delete(`/movements/${match.params.id}`)
      .then(() =>
        setRedirect(true)
      )
    }
  }

  async function Save(){
    //valida????o dos dados
    if(!description){
      return alert("Voc?? precisa informar a descri????o")
    }else if(!amount){
      return alert("Voc?? precisa selecionar o valor")
    }else if(!date){
      return alert("Voc?? precisa definir a data da movimenta????o")
    }else if(parseInt(quantity) < 1){
      return alert("Quantidade n??o pode ser menor do que 1")
    }else if(option === '0' && optionPart === '0' && parseInt(quantity) > 1){
      return alert("Selecione uma op????o de repeti????o (parcelar ou repetir valor)")
    }else if(option === '1' && optionPart === '2'){
      return alert("Selecione apenas uma op????o de repeti????o (parcelar ou repetir valor)")
    }

    let newAmount;

    if (optionPart == '2'){
      newAmount = (parseFloat(amount) / parseFloat(quantity)).toString();
    }else{
      newAmount = amount;
    }

    if(match.params.id){
      await api.put(`/movements/${match.params.id}`, {
        amount,
        movementDate: date + 1,
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
      for(let i = 0; i < parseInt(quantity); i ++){
        
        let oldDate = new Date(date);
        let newDate = new Date(oldDate.setMonth(oldDate.getMonth() + i));
        newDate.setDate(newDate.getDate() + 2);

        await api.post('/movements', {
          amount: newAmount,
          movementDate: formatDate(newDate),
          user,
          movementType: description,
        }).then(() =>
          setRedirect(true)
        )
      }
    }
  }

    //atualizar o conte??do a cada vez que a tela for carregada ou o filtro for atualizado
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
      <h1>Cadastro de Movimenta????es</h1>
      <Form>
      <TypeIcons>
          {
            typeIcons.map((icon, index) => (
              index > 0 && 
              <button type="button" onClick={() => setType(String(index))}>
                <img src={icon} alt="Tipo da Movimenta????o"/>
              </button>
              ))
          }
        </TypeIcons>
        
        <span>Descri????o</span>
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
            <span>Descri????o</span>
            <input type="text" placeholder="Descri????o" 
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

          <Checkbox type="checkbox" id="check-repeat" onChange={e => setOption(e.target.checked == true ? '1' : '0')}></Checkbox>
          
          <CheckboxLabel>
            <label>
              Repetir    
            </label>
          </CheckboxLabel>

          <Checkbox type="checkbox" id="check-part" onChange={e => setOptionPart(e.target.checked == true ? '2' : '0')}></Checkbox>
          
          <CheckboxLabel>
            <label>
              Parcelar    
            </label>
          </CheckboxLabel>

        <Input id="quantity-input">
            <span>Quantidade</span>
            <input type="number" placeholder="Quantidade" 
            onChange={e => setQuantity(e.target.value)} value={quantity}/>
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
