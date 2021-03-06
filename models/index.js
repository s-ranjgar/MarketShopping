const express=require('express');
const sql=require('mssql');
const app=express();
var fs=require('fs');
var path=require('path');
var basename=path.basename(__filename);

var Sequelize=require('sequelize');
var config=require(__dirname+'/../config/config.js');
var db={};





var sequelize=new Sequelize(config.database,config.username,config.password,{host:'localhost',dialect:'mssql'});


fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
     
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;

  });





  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  
  module.exports = db;