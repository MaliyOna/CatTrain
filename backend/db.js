const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "0jt6YtS57IakNbfRteBh", //; до "
    host: "localhost",
    port: 5432,
    database: "catTrain"
});

module.exports = pool