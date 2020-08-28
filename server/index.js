const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pizzapi = require('dominos');
const port = process.env.PORT || 5000;

let order = null;
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
            myStore = new pizzapi.Store({});
            myStore.ID = storeID;
            myStore.getMenu(data => {
                // console.log(data.menuData);
                res.send({ storeData, menuData: data.menuData})
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
    order = new pizzapi.Order(
        {
            customer: customer,
            storeID: myStore.ID,
            deliveryMethod: 'Delivery'
        }
    );

    const cheeseSteakPizza = new pizzapi.Item({
        code: 'P14IREPH',
        quantity: 1
    }); //Large (14") Hand Tossed Philly Cheese Steak
    order.addItem(cheeseSteakPizza);

    const specialtyPizzaCoupon = new pizzapi.Coupon({
        code: '9175'
    });//"Any Large Specialty Pizza" at 16.99
    order.addCoupon(specialtyPizzaCoupon);
    
    order.price(price => console.log(price.result.Order.Amounts))
    order.validate(
        result => {
            order = result;
            res.send(result);
        }
    );
})

app.post('/payment-form', (req, res) => {
    console.log(order)
    console.log(req.body)  
    const expiration = req.body.month + req.body.year;
    let cardInfo = new pizzapi.Payment();
    // cardInfo.Amount = order.Amounts.Customer;
    cardInfo.Number = req.body.Number;
    cardInfo.CardType = order.validateCC(req.body.Number);
    cardInfo.Expiration = expiration;
    cardInfo.SecurityCode = req.body.SecurityCode;
    cardInfo.PostalCode = req.body.PostalCode;
    res.send(cardInfo)
})

app.listen(port, console.log(`Listening on port ${port}`));