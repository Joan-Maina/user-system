const connection = require("../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signUpValidation = require("../helpers/SignupValidate");
const encryptPassword = require("../helpers/Encrypt");


const signup = async (req, res) => {
  try {
    const { error } = signUpValidation(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    let {username, email, password, confirmpassword} = req.body;
    let users = await connection.query(`SELECT username, email FROM userDetails WHERE email = '${email}';`);
      console.log(users.recordset.length)
      if (users.recordset.length !== 0) return res.send('email already exists')
      if (password !== confirmpassword) return res.send("passwords not matching");
      let pass = await encryptPassword(password);
      await connection.query(`INSERT INTO userDetails (username, email, password) VALUES ('${username}','${email}','${pass}');`);
      const token = jwt.sign( { email, password }, process.env.secretkey, {
        expiresIn: "1h",
      });
      res.send(token);
  } catch (error) {
    console.log(error);
  }
}
module.exports = signup;
