import React, {useMemo} from 'react';

import { Container, Content, Filters } from './styles';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import Months from '../../utils/months';
import Years from '../../utils/years';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

const List: React.FC<IRouteParams> = ({ match }) => {
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
        <HistoryFinanceCard 
          tagColor='#E44C43'
          title='Conta de Luz'
          subtitle='26/12/2020'
          amount='R$ 250,00'
        />
      </Content>
    </Container>
  );
};

export default List;
