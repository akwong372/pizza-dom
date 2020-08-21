import React from 'react';
import axios from 'axios';

const handleSubmit = e => {
  e.preventDefault();
  const data = {
    Street: e.target[0].value,
    City: e.target[1].value,
    Region: e.target[2].value,
    PostalCode: e.target[3].value
  };
  axios.post('/', data)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}

function App() {
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        street
    <input />
        city
    <input />
        state
    <input />
        zipcode
    <input />
        <button />
      </form>
    </div>
  );
}

export default App;
