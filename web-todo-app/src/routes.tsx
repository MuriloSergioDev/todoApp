import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Task from './pages/Task';
import Detail from './pages/Detail';
import NewTask from './pages/NewTask';
import PrivateRoute, { } from './components/PrivateRoute';

const src: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route  path="/login" component={SignIn} />
        <Route  path="/signup" component={SignUp} />
        {/* <Route  path="/detail" component={Detail} /> */}
        <PrivateRoute exact path="/">
          <Task/>
        </PrivateRoute>
        <PrivateRoute path="/detail/:id">
          <Detail/>
        </PrivateRoute>
        <PrivateRoute path="/new-task">
          <NewTask/>
        </PrivateRoute>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default src;