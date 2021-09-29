// base real
const e = require('express');
const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

// hacer conexión
let connection;
function handleConnection(){
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if(err){
            console.error('[DB ERROR]', err);
            setTimeout(handleConnection, 2000);
        }
        else{
            console.log('base conectada exitosamente');
        }
    });

    connection.on('error', (err) => {
        console.error('[DB ERROR]', err);
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            setTimeout(handleConnection, 2000);
        }
    })
}

handleConnection();

function list(table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    });
}

function get(table, id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if(err) return reject(err);
            resolve(data)
        })
    })
}

function insert(table, data){
    return new Promise((resolve, reject) => {
        console.log(`INSERT INTO ${table} SET`, data);
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

function update(table, dataToUpdate){
    return new Promise((resolve, reject) => {
        console.log(`UPDATE ${table} SET ?`, dataToUpdate);
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [dataToUpdate, dataToUpdate.id], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    })
}

function query(table, query, join){
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, result) => {
            if(err) return(reject)
            if(join){
                resolve(result || null);
            }
            else{
                resolve(result[0] || null)
            }
        })
    })    
}

module.exports = {
    list,
    get,
    insert,
    update,
    query,
}