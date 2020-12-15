import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Header from './components/Header';
import QuizList from './components/QuizList';

import { useStateValue } from './StateProvider';

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.getItem('id')) {
      dispatch({
        type: 'PERSISTED_USER',
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        profile: localStorage.getItem('profile'),
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/quiz/:category/:id">
            <Header />
            <QuizList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
