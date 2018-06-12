
const genericPool = require("generic-pool");

var mysqlConfig = require('../../../../shared/config/mysql');
var mysql = require('mysql');

var env = process.env.NODE_ENV || 'development';
if(mysqlConfig[env]) {
  mysqlConfig = mysqlConfig[env];
}


const factory = {
  create: function() {
    return mysql.createConnection({
                user: mysqlConfig.user,
                password: mysqlConfig.password,
                database: mysqlConfig.database
        });
  },
  destroy: function(client) {
    client.disconnect();
  }
};

const opts = {
  max: 10, // maximum size of the pool
  min: 2, // minimum size of the pool
  log: true
};


/*
 * Create mysql connection pool.
 */
var createMysqlPool = function(){
  // return _poolModule.createPool({
  //   name     : 'mysql',
  //   create   : function() {

  //     var client = mysql.createConnection({
  //       host: mysqlConfig.host,
  //       user: mysqlConfig.user,
  //       password: mysqlConfig.password,
  //       database: mysqlConfig.database
  //     });
  //     console.log(client);
  //     console.log(callback);
  //     callback && callback(null, client);
  //   },
  //   destroy  : function(client) { client.end(); },
  //   max      : 10,
  //   idleTimeoutMillis : 30000,
  //   log : false
  // });
  
  return genericPool.createPool(factory, opts);
};

exports.createMysqlPool = createMysqlPool;
