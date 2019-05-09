import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/cart'
import Default from './components/Default'
import Model from './components/Model'

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route  component={Default}></Route>
      </Switch>
      <Model></Model>
    </React.Fragment>
  );
}

export default App;
