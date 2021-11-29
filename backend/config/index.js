const sql = require("mssql");

const config = require("./dbconfig");

const connection = async () => {
  let pool = null;
  try {
      // console.log(config);
    pool = sql.connect(config);
  } catch (error) {
    pool = null;
    console.log("Error: ", error);
  }
  return pool;
};

const querying = async (query) => {
  const ourPool = await connection();
  const results = ourPool.request().query(query);
  return results;
};
module.exports = {
  query: querying,
};
