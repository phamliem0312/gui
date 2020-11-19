const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
const host = "127.0.0.1";
let routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('./views/public'));
app.use(cors());

routes(app);

app.listen(port, host, (err)=>{
    if(err) throw err;
    console.log("App is listening on " + host + ":" + port);
});

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});