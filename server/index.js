const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pizzapi = require('pizzapi');
const port = process.env.PORT || 5000;

// let order = new pizzapi.Order({
//     deliveryMethod: 'Delivery'
// }); //only create order after have all info?
let address = null;
let customer = null;
let storeID = null;
let myStore = null;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('test')
});

app.post('/', (req, res) => {
    address = new pizzapi.Address(req.body);
    pizzapi.Util.findNearbyStores(
        address,
        'Delivery',
        (storeData) => {
            storeID = storeData.result.Stores[0].StoreID;
            // order.storeID = storeID;
            myStore = new pizzapi.Store({});
            myStore.ID = storeID;
            myStore.getMenu(menuData => {
                res.send({ storeData, menuData });
            })
        }
    );
});

app.post('/customer-form', (req, res) => {
    const customerData = {
        address,
        ...req.body
    }
    customer = new pizzapi.Customer(customerData);
    // order.FirstName = customerData.firstName;
    // order.LastName = 
    res.send(order)
})

app.listen(port, console.log(`Listening on port ${port}`));