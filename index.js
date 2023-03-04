const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors()); //Siempre poner esta line al usar cors
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//parse application/json
app.use(bodyParser.json());
//Solo en development
// app.use(cors());
app.use('/register', authRouter);

app.get('/', (req, res) => {
    res.send('servidor funcionando')
});

app.listen(process.env.PORT || 4000, () => {
    console.log('servidor funcionando en 4000')
})
