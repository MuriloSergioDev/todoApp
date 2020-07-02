import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Task from './pages/Task';
import Detail from './pages/Detail';

const src: React.FC = () => {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/task" component={Task} />
            <Route exact path="/detail" component={Detail} />
            <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
  );
}

export default src;