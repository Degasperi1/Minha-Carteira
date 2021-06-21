import React, {useMemo, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {MdAddCircle} from 'react-icons/md';

import { Container, Content, Filters, ButtonNew } from './styles';

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
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);
  
  const { type } = match.params;


  async function loadMovements () {
    await api.get(`/movements/type/${match.params.type}`)
      .then(response => {
        type === '1' ? setGains(response.data) : setExpenses(response.data)
      })
  }


  const infos = useMemo(() => {
    loadMovements();
    return type === '1'? {
      title: 'Entradas',
      lineColor: '#F7931B',
      data: gains
    } : {
      title: 'Saídas',
      lineColor: '#E44C43',
      data: expenses
    }
  }, [type]);

  
  const years = [
    {
      value: 2020,
      label: 2020
    },
    {
      value: 2021,
      label: 2021
    },
  ] ;

/*   const years = useMemo(() => {
    let uniqueYears: number[] = [];
    
    const { data } = infos;
    console.log(data);

    data.forEach(item => {
        const date = new Date(item.dateFormatted);
        const year = date.getFullYear();

        if(!uniqueYears.includes(year)){
            uniqueYears.push(year)
       }
    });

    return uniqueYears.map(year => {
        return {
            value: year,
            label: year,
        }
    });
},[infos]);
   */

const months = useMemo(() => {
    return Months.map((month, index) => {
        return {
            value: index + 1,
            label: month,
        }
    });
},[]);


const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if(alreadySelected >= 0){
        const filtered = frequencyFilterSelected.filter(item => item !== frequency);
        setFrequencyFilterSelected(filtered);
    }else{            
        setFrequencyFilterSelected((prev) => [...prev, frequency]); 
    }
}

const handleMonthSelected = (month: string) => {
    try {
        const parseMonth = Number(month);
        setMonthSelected(parseMonth);
    }
    catch{
        throw new Error('invalid month value. Is accept 0 - 24.')
    }
}

const handleYearSelected = (year: string) => {
    try {
        console.log('teste')
        const parseYear = Number(year);
        setYearSelected(parseYear);
        console.log(parseYear);
      }
    catch{
        throw new Error('invalid year value. Is accept integer numbers.')
    }
}

  const listData = useMemo(() => {
    return type === '1' ? gains : expenses;
  }, [type, expenses, gains]);

  useEffect(() => {
    loadMovements();
    const filteredData = listData.filter(item => {
      const date = new Date(item.movement_date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredData.map(item => {
      return {
        id: item.id_movement,
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency === 'R' ? 'Recorrente' : 'Eventual',
        dateFormatted: formatDate(item.movement_date),
        tagColor: item.frequency === 'E' ? '#4E41F0' : '#E44C4E'
      }
    })

       setData(formattedData);
  }, [monthSelected, yearSelected, type, gains, expenses]);

  return (
      <Container>
        <ContentHeader title={infos.title} lineColor={infos.lineColor}>
                <SelectInput 
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)} 
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years} 
                    onChange={(e) => handleYearSelected(e.target.value)} 
                    defaultValue={yearSelected}
                />
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
              <Link to={`/movements/${item.id}`} style={{ textDecoration: 'none' }}>  
                <HistoryFinanceCard 
                  key={item.id}
                  tagColor={item.tagColor}
                  title={item.description}
                  subtitle={item.dateFormatted}
                  amount={item.amountFormatted}
                  />  
              </Link>
            ))
          }
        </Content>

        <ButtonNew href="/movements">
              <button type= "button" > 
                <MdAddCircle/>
              </button>
        </ButtonNew>
      
      </Container>
  );
};

export default List;
