import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';
import ConfirmOrder from './components/ConfirmOrder';
import About from './components/About';

const App = () => {

  const [store, setStore] = useState({});
  const [price, setPrice] = useState({
    FoodAndBeverage: '0.00',
    Tax: '0.00',
    DeliveryFee: '0.00',
    Savings: '0.00',
    Customer: '0.00'
  });

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
        if (response.data.storeData) {
          console.log(response.data);
          setStore(response.data.storeData.result.Stores[0]);
          history.push('/customer-form');
        } else {
          console.log('invalid address')
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleCustomer = (e, history) => {
    e.preventDefault();
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value
    }
    axios.post('/customer-form', data)
      .then(response => {
        console.log(response)
        setPrice({ ...response.data.result.Order.AmountsBreakdown });
        history.push('/payment-form')
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handlePayment = (e, history) => {
    e.preventDefault();
    console.log(e.target)
    const data = {
      Number: e.target[0].value,
      SecurityCode: e.target[1].value,
      PostalCode: e.target[2].value,
      month: e.target[3].value,
      year: e.target[4].value.slice(2)
    }
    axios.post('/payment-form', data)
      .then(response => {
        console.log(response);
        history.push('/confirm-order')
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirm = () => {
    axios.post('/confirm-order', {})
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <Header storeData={store} />
        <Router>
          <Route exact path="/" render={() => <AddressForm handleSubmit={handleAddress} />} />
          <Route exact path="/customer-form" render={() => <CustomerForm storeID={store.StoreID} handleSubmit={handleCustomer} />} />
          <Route exact path="/payment-form" render={() => <PaymentForm storeID={store.StoreID} handleSubmit={handlePayment} />} />
          <Route exact path="/confirm-order" render={() => <ConfirmOrder handleSubmit={handleConfirm} foodTotal={price.FoodAndBeverage} tax={price.Tax} delivery={price.DeliveryFee} savings={price.Savings} total={price.Customer} />} />
          <Route exact path="/about" component={About} />
        </Router>
        {store.StoreID ? <div className="store-info">
          <div>Ordering from Dominos store ID: {store.StoreID}</div>
          <div>{store.AddressDescription}</div>
        </div> : <div className="store-info">No Store Currently Selected</div>}
      </div>
      <Footer />
    </div>
  );
};

export default App;
