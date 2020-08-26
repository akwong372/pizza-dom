import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home';
import AddressForm from './components/AddressForm';

const App = () => {

  const [store, setStore] = useState('');
  const [menu, setMenu] = useState('');

  const handleSubmit = (e, history) => {
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
          history.push('/home');
        } else {
          console.log('invalid address')
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  // const renderPage = pageNum => {
  //   switch (pageNum) {
  //     case 0:
  //       return <AddressForm handleSubmit={handleSubmit} />
  //     default:
  //       return <AddressForm handleSubmit={handleSubmit} />
  //   }
  // }

  return (
    <div className="App">
      {/* {renderPage(checkoutPage)} */}

      {JSON.stringify(store)}
      <Router>
        <Switch>
          <Route exact path="/">
            <AddressForm handleSubmit={handleSubmit} />
          </Route>
          <Route exact path="/home">
            <Home storeID={store.StoreID}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
