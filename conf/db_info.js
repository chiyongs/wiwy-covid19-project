const mysql = require("mysql");
const PASSWORD = "wiwy1234";

const dbconnInfo = {
  chiyongs: {
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "wiwycovid",
  },
  wiwy: {
    host: "13.125.245.214",
    user: "chiyongs",
    password: PASSWORD,
    database: "wiwycovid",
  },
};

const dbconnection = {
  init: function () {
    return mysql.createConnection(dbconnInfo.wiwy);
  },

  dbopen: function (con) {
    con.connect(function (err) {
      if (err) {
        console.error("mysql connection error :" + err);
      } else {
        console.info("mysql connection successfully.");
      }
    });
  },
};

module.exports = dbconnection;
