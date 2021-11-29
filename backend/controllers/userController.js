const connection = require("../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signUpValidation = require("../helpers/SignupValidate");
const encryptPassword = require("../helpers/Encrypt");
const jwtGenerate = require("../helpers/jwtGenerate");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  //   try {
  //     console.log(req.body)

  //       const data = jwt.verify(token, process.env.secretkey)
  // console.log('data')
  //       req.user = data;

  //   } catch (error) {
  //       res.status(400).json({ message: "Invalid token" })
  //   }
  let email = req.body.email;
  let password = req.body.password;

  let selectuseremail = await connection.query(
    `SELECT username, email, password FROM userDetails WHERE email = '${email}';`
  );

  console.log(selectuseremail.recordset);
  if (selectuseremail.recordset.length !== 1) {
    // console.log(selectuseremail.recordset.length)
    res.send("Wrong inputs");
  } else {
    const username = selectuseremail.recordset[0].username;
    const loginguserpassword = selectuseremail.recordset[0].password;
    let auth = await bcrypt.compare(password, loginguserpassword);
    console.log(!auth);
    if (!auth) {
      res.send({ message: "wrong password" });
    } else {
      const token = jwtGenerate({ username, email });
      console.log("token :" + token);

      res.send({ message: "success", token: token });
    }
  }
};

const signup = async (req, res) => {
  try {
    const { error } = signUpValidation(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    let { username, email, password, confirmpassword } = req.body;
    let users = await connection.query(
      `SELECT username, email FROM userDetails WHERE email = '${email}';`
    );
    console.log(users.recordset.length);
    if (users.recordset.length !== 0) return res.send("email already exists");
    if (password !== confirmpassword) return res.send("passwords not matching");
    let pass = await encryptPassword(password);
    await connection.query(
      `INSERT INTO userDetails (username, email, password) VALUES ('${username}','${email}','${pass}');`
    );
    const token = jwtGenerate({ email, password });
    res.send(token);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, loginUser };
