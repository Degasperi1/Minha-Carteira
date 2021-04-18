import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Movs from '../pages/Movs';

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/movements/type/:type" exact component={List}/>
            <Route path="/movements/" exact component={Movs}/>
            <Route path="/movements/:id" exact component={Movs}/>
        </Switch>
    </Layout>
);

export default AppRoutes;