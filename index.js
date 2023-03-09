const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const horarioRouter = require('./routes/horarios');
const rolRouter = require('./routes/roles');
const registerRouter = require('./routes/register');
const bookingRouter = require('./routes/booking')

const app = express();


app.use(cors()); 

app.use(express.json())
app.use('/login', authRouter);
app.use('/user', userRouter);
app.use('/horarios', horarioRouter)
app.use('/rol', rolRouter)
app.use('/register', registerRouter)
app.use('/reservas', bookingRouter) 

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
