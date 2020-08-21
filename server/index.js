const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pizzapi = require('pizzapi');
const port = process.env.PORT || 5000;
// const myStore = new pizzapi.Store({});
// myStore.ID = 8217

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var jsonAddress = new Address(
//     {
//         Street: '900 Clark Ave',
//         City: 'St. Louis',
//         Region: 'MO',
//         PostalCode: 63102
//     }
// );

app.get('/', (req, res) => {
    pizzapi.Util.findNearbyStores(
        {
            Street: '900 Clark Ave',
            City: 'St. Louis',
            Region: 'MO',
            PostalCode: 63102
        },
        'Delivery',
        function(storeData){
            res.send(storeData);
        }
    );
    // myStore.getMenu(
    //     (data) => {
    //         res.send(data)
    //     }
    // )
    // res.send('test')
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

app.listen(port, console.log(`Listening on port ${port}`));