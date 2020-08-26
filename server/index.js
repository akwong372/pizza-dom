const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pizzapi = require('pizzapi');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    // myStore.getMenu(
    //     (data) => {
    //         res.send(data)
    //     }
    // )
    // res.send('test')
    res.send('test')
});

app.post('/', (req, res) => {
    const locationData = new pizzapi.Address(req.body);
    pizzapi.Util.findNearbyStores(
        locationData,
        'Delivery',
        (storeData) => {
            const StoreID = storeData.result.Stores[0].StoreID;
            const myStore = new pizzapi.Store({});
            myStore.ID = StoreID;
            myStore.getMenu(menuData => {
                res.send({storeData, menuData});
            })
        }
    );
})

app.listen(port, console.log(`Listening on port ${port}`));