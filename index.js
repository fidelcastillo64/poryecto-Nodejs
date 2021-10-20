const express = require('express');
const app = express();
const morgan = require('morgan');
const empleados = require('./routes/empleados');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req,res, next)=>{
    res.status(200).json({code: 1, message: "Bienveniedo al pokedex"});
    res.send("hola");
});

app.use("/user", user);
//autotentificacion
app.use(auth);
app.use("/empleados", empleados);

app.use(notFound);


app.listen(process.env.PORT|| 3000,()=>{
    console.log("Server is rinning...");
});