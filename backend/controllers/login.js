const connection = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtGenerate = require('../helpers/jwtGenerate')

const login = async(req, res) => {
    const email =  req.body.email;
    const password = req.body.password;
    //check token
    let token = req.body.headers.Authorization.split(' ')[1];
    // console.log(token)
    if (token === 'undefined') return res.send({token: jwtGenerate({ email, password})});
     
// const loginNewly = async() => {
    try {
        const data = jwt.verify(token, process.env.secretkey)

        req.user = data;
        // console.log(req.user.password)
        // next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" })
    }
    // console.log(req.body)
    //get email and password

    //check if email already exists
    
    let selectuseremail = await connection.query(`SELECT username, email,password FROM userDetails WHERE email = '${email}';`);
   
    if(selectuseremail.recordset.length !== 1){
        res.send('Wrong inputs')
    }else{
        const username = selectuseremail.recordset[0].username;
        const loginguserpassword = selectuseremail.recordset[0].password;
        let auth = await bcrypt.compare(password, loginguserpassword);
       
        if(!auth) {  
            res.send('wrong password')
        }else{
          
            const token = jwtGenerate({username,email})
            console.log("token :" + token)
           
            res.send({message: "success",
                    token: token})
                    }   
                }
    }

module.exports = login;