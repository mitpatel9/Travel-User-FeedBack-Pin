const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const app=express();
const pinRoute=require('./routes/Pins');
const userRoute=require('./routes/Users');
const cors = require('cors')

app.use(cors())

//env confi
dotenv.config();
//middalware
app.use(express.json());

// mongodb connect
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true}).then(()=>{
    console.log('mongodb connect')
}).catch((err)=>{
    console.log(err)
})
mongoose.set('strictQuery', true);

  

//all route 
app.use('/api/pins',pinRoute);
app.use('/users',userRoute)

// local server
app.listen(8000, ()=>{
    console.log('backend Server is Runinnd 8000 port')
})