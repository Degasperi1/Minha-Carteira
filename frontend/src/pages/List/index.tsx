import React, {useMemo, useState, useEffect} from 'react';

import { Container, Content, Filters } from './styles';

import api from '../../services/api';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import Months from '../../utils/months';
import Years from '../../utils/years';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

//import gains from '../../repositories/gains';
//import expenses from '../../repositories/expenses';


interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [gains, setGains] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  
  const { type } = match.params;

  async function loadMovements () {
    await api.get(`/movements/type/${match.params.type}`)
      .then(response => {
        type === '1' ? setGains(response.data) : setExpenses(response.data)
      })
    console.log('gains');
    console.log(gains);
    console.log('expenses')
    console.log(expenses)
  }


  const infos = useMemo(() => {
    return type === '1'? {
      title: 'Entradas',
      lineColor: '#F7931B'
    } : {
      title: 'Saídas',
      lineColor: '#E44C43'
    }
  }, [type]);

  const listData = useMemo(() => {
    return type === '1' ? gains : expenses;
  }, [type, expenses, gains]);

  useEffect(() => {
    loadMovements();
    const filteredData = listData.filter(item => {
      const date = new Date(item.movement_date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredData.map(item => {
      return {
        id: String(new Date().getTime()) + item.amount,
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency === 'R' ? 'Recorrente' : 'Eventual',
        dateFormatted: formatDate(item.movement_date),
        tagColor: item.frequency === 'R' ? '#4E41F0' : '#E44C4E'
      }
    })

       setData(formattedData);
  }, [monthSelected, yearSelected, listData]);

  return (
    <Container>
      <ContentHeader title={infos.title} lineColor={infos.lineColor} >
        <SelectInput options={Months} onChange={(e) => setMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={Years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected}/>
      </ContentHeader>
      
      <Filters>
        <button 
          type="button"
          className="tag-filter tag-filter-recurrent"
        >
          Recorrentes
        </button>
        <button 
          type="button"
          className="tag-filter tag-filter-eventual"
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {
          data.map(item => (
            <HistoryFinanceCard 
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />  
          ))
        }
      </Content>
    </Container>
  );
};

export default List;
