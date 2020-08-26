import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CustomerForm from './components/CustomerForm';
import AddressForm from './components/AddressForm';

const App = () => {

  const [store, setStore] = useState('');
  const [menu, setMenu] = useState('');

  const handleAddress = (e, history) => {
    e.preventDefault();
    const data = {
      Street: e.target[0].value,
      City: e.target[1].value,
      Region: e.target[2].value,
      PostalCode: e.target[3].value
    };
    axios.post('/', data)
      .then(response => {
        if (response.data.menuData && response.data.storeData) {
          console.log(response.data);
          setStore(response.data.storeData.result.Stores[0]);
          setMenu(response.data.menuData.result);
          history.push('/customer-form');
        } else {
          console.log('invalid address')
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleCustomer = e => {
    e.preventDefault();
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value
    }
    axios.post('/customer-form', data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      {/* {renderPage(checkoutPage)} */}

      {JSON.stringify(store)}
      <Router>
        <Switch>
          <Route exact path="/">
            <AddressForm handleSubmit={handleAddress} />
          </Route>
          <Route exact path="/customer-form">
            <CustomerForm storeID={store.StoreID} handleSubmit={handleCustomer} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
