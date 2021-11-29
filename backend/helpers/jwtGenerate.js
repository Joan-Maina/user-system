const jwt = require('jsonwebtoken')

function jwtGenerate ({username,email}){
console.log(email)
  let token = jwt.sign({username,email}, process.env.secretkey,{expiresIn:'1h'});
return token
}

module.exports = jwtGenerate;