import React, {useMemo, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {MdAddCircle} from 'react-icons/md';

import { Container, Content, Filters, ButtonNew, Input } from './styles';

import api from '../../services/api';

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';


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
  frequency: string;
  InOut: string;
  tagColor: string;
}

const MovType: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [movementTypes, setMovementTypes] = useState<any[]>([]);
  const [filterText, setFilterText] = useState<string>();
  


  async function loadMovements () {
    await api.get(`/movementTypes`)
      .then(response => {
        setMovementTypes(response.data)
      })
  }


  const infos = useMemo(() => {
    return '1' === '1'? {
      title: 'Entradas',
      lineColor: '#F7931B'
    } : {
      title: 'Saídas',
      lineColor: '#E44C43'
    }
  }, []);

  const listData = useMemo(() => {
    return movementTypes;
  }, [movementTypes]);

  useEffect(() => {
    loadMovements();
    const filteredData = listData.filter(item => {
      const descriptionItem = item.description;
      return descriptionItem.toLowerCase().includes(filterText);
    });

    const formattedData = filteredData.map(item => {
      return {
        id: item.id_movement_type,
        description: item.description,
        frequency: item.frequency === 'R' ? 'Recorrente' : 'Eventual',
        InOut: item.mov_type === '1' ? 'Entrada' : 'Saída',
        tagColor: item.mov_type === '1' ? '#4E41F0' : '#E44C43'
      }
    })

    setData(formattedData);
  }, [filterText]);

  return (
      <Container>
        <ContentHeader title='Cadastro de tipos de movimentação' lineColor={infos.lineColor} >
        </ContentHeader>
        <Input>
            <input type="text" placeholder="Descrição" 
            onChange={e => setFilterText(e.target.value)} value={filterText}/>
        </Input>
        <Filters>
          <button 
            type="button"
            className="tag-filter tag-filter-eventual"
          >
            Entradas
          </button>
          <button 
            type="button"
            className="tag-filter tag-filter-recurrent"
          >
            Saídas
          </button>

        </Filters>

        <Content>
          {
            data.map(item => (
              <Link to={`/movementTypeRegister/${item.id}`} style={{ textDecoration: 'none' }}>  
                <HistoryFinanceCard 
                  key={item.id}
                  tagColor={item.tagColor}
                  title={item.description}
                  subtitle={item.frequency}
                  amount={''}
                  />  
              </Link>
            ))
          }
        </Content>

        <ButtonNew href="/movementTypeRegister">
              <button type= "button" > 
                <MdAddCircle/>
              </button>
        </ButtonNew>
      
      </Container>
  );
};

export default MovType;
