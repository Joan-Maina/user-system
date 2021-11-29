
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())
const PORT =9000
const usersRoute = require('./routes/users')

app.use('/api', usersRoute)

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
});