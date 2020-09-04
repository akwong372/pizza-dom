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
            if (storeData.result.Stores.length >= 1) {
                storeID = storeData.result.Stores[0].StoreID;
                myStore = new pizzapi.Store({});
                myStore.ID = storeID;
                myStore.getMenu(data => {
                    res.send({ storeData, menuData: data.menuData })
                });
            } else {
                res.send(false);
            }
        }
    );
});

app.post('/customer-form', (req, res) => {
    const customerData = {
        address,
        ...req.body
    }
    customer = new pizzapi.Customer(customerData);
    if (myStore) {
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

        order.validate(
            result => {
                console.log(result)
            }
        );
        order.price(price => res.send(price));
    } else {
        res.send('Please enter a valid address to search for a store first.');
    }
});

app.post('/payment-form', (req, res) => {
    const expiration = req.body.month + req.body.year;
    if (order) {
        let cardInfo = new order.PaymentObject();
        cardInfo.Amount = order.Amounts.Customer;
        cardInfo.Number = req.body.Number;
        cardInfo.CardType = order.validateCC(req.body.Number);
        cardInfo.Expiration = expiration;
        cardInfo.SecurityCode = req.body.SecurityCode;
        cardInfo.PostalCode = req.body.PostalCode;
        order.Payments.push(cardInfo)
        res.send(cardInfo);
    } else {
        res.send('Please enter a valid address to search for a store first.');
    }
});

app.post('/confirm-order', (req, res) => {
    // if (order) {
    //     order.place(
    //         (result) => {
    //             console.log("Order placed!");
    //             res.send(result);
    //         }
    //     );
    // } else {
    //     res.send('No valid order detected.');
    // }
    res.send('ok')//comment this and uncomment above to enable payment on last page
});

app.listen(port, console.log(`Listening on port ${port}`));