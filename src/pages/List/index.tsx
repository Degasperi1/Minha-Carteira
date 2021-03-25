import React, {useMemo, useState, useEffect} from 'react';

import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import Months from '../../utils/months';
import Years from '../../utils/years';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';


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

  const { type } = match.params;

  const infos = useMemo(() => {
    return type === 'entry-balance' ? {
      title: 'Entradas',
      lineColor: '#F7931B'
    } : {
      title: 'Saídas',
      lineColor: '#E44C43'
    }
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type]);

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: item.amount,
        frequency: item.frequency,
        dateFormatted: item.date,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    })

       setData(response);
  }, []);

  return (
    <Container>
      <ContentHeader title={infos.title} lineColor={infos.lineColor} >
        <SelectInput options={Months}/>
        <SelectInput options={Years}/>
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
