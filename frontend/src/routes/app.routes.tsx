import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Movs from '../pages/Movs';
import MovType from '../pages/MovType';
import MovTypeRegister from '../pages/MovTypeRegister';

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/movements/type/:type" exact component={List}/>
            <Route path="/movements/" exact component={Movs}/>
            <Route path="/movements/:id" exact component={Movs}/>
            <Route path="/movementType/" exact component={MovType}/>
            <Route path="/movementTypeRegister/" exact component={MovTypeRegister}/>
            <Route path="/movementTypeRegister/:id" exact component={MovTypeRegister}/>
        </Switch>
    </Layout>
);

export default AppRoutes;