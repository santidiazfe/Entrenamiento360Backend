const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const dayRouter = require('./routes/day');
const hourRouter = require('./routes/horario')
const rolRouter = require('./routes/roles')
const registerRouter = require('./routes/register')

const app = express();

app.use(cors()); //Siempre poner esta line al usar cors
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//parse application/json
app.use(bodyParser.json());
//Solo en development
// app.use(cors());
app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/day', dayRouter);
app.use('/horario', hourRouter)
app.use('/rol', rolRouter)
app.use('/register',registerRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
  });
  
app.get('/', (req, res) => {
    res.send('servidor 360 funcionando')
});

app.listen(process.env.PORT || 4000, () => {
    console.log('servidor funcionando en 4000')
})
