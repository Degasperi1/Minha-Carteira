import { ReactNode, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Input, Form, GenerateButton, Select, MenuItemLink } from './styles';

interface ReportsProps {
  children: ReactNode;
}

const Reports: React.FC = () => {

  const [type, setType] = useState<string>(); 
  const [initialDate, setInitialDate] = useState<string>(); 
  const [finalDate, setFinalDate] = useState<string>(); 

  function generate () {

  }

  return (
    <Container>
      <h1>Relatórios</h1>

      <Form>

        <Input>
          <span>Data</span>
          <input type="date" placeholder="Data"
          onChange={e => setInitialDate(e.target.value)} value={initialDate}/>
        </Input>

        <Input>
          <span>Data</span>
          <input type="date" placeholder="Data"
          onChange={e => setFinalDate(e.target.value)} value={finalDate}/>
        </Input>

        <span>Tipo de movimentação</span>
        <Select
          name="mov-type"
          id="selectmovtype"
          onChange={e => setType(e.target.value)} value={type}
        >
          <option value="0"></option>
          <option value="1">Entradas</option>
          <option value="2">Saídas</option>
          
        </Select>

        <MenuItemLink href={"http://localhost:3333/reports/pdf/" + type + "/" + initialDate + "/" + finalDate} target="_blank" >
            GERAR
        </MenuItemLink>
      </Form>
    </Container>
  );
};

export default Reports;
