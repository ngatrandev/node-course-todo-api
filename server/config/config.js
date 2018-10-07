var env = process.env.NODE_ENV || "development";
if (env === "development" || env === "test") {
    var config = require('./config.json');
    var envConfig = config[env]; // dùng để truy cập các property của file config.json
    Object.keys(envConfig).forEach((key)=> {
        process.env[key] = envConfig[key];
    });
    //Object.keys() trả về array chứa các key trong envConfig

}