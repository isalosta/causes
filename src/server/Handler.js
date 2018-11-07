'use strict'

const model = require('./model/dataModel.js');
const log = require('./../util/logger.js');
const DB = require('./DBmanager.js');

log.U_LOGS("INIT HANDLER");

var storedID = [];
var storedEmail = [""];
var storedPasswords = [""];
var storedName = [""];
var storeAddress = [""];
var storePostal = [""];
var storeBirthday = [""];

function SetUser(u){
    console.log(u);
    for(var i = 0; i < u.length; i++){
        storedID.push(u[i].id);
        log.PROC_LOGS('STORE ID: '+u[i].id);
        storedEmail.push(u[i].user_email);
        log.PROC_LOGS('STORE EMAIL: '+u[i].user_email);
        storedPasswords.push(u[i].user_password);
        storedName.push(u[i].user_firstname +" "+u[i].user_lastname);
        log.PROC_LOGS('STORE NAME: '+u[i].user_firstname +" "+u[i].user_lastname);
    }
}

async function InitData() {
    await DB.Get_SQL_Array("SELECT * FROM `ms_user`", SetUser);
}

async function GET_USERBYEMAIL(strEmail) {
    log.PROC_LOGS("GET USER BY EMAIL | "+strEmail);
    var email = () => {
        for(var i = 0; i < storedEmail.length; i++){
            if(storedEmail[i] == strEmail){
                log.PROC_LOGS("GET USER BY EMAIL | GET EMAIL ");
                return strEmail;
            }
        }
    };

    if(email == null || email == undefined){
        log.PROC_LOGS("GET USER BY EMAIL | FAIL NULL");
        return {};
    } else {
        log.PROC_LOGS("GET USER BY EMAIL | NOT NULL");
        var idx = storedEmail.indexOf(strEmail);

        let data = {
            ID: storedID[idx],
            email: storedEmail[idx],
            password: storedPasswords[idx]
        }
        log.PROC_LOGS("GET USER BY EMAIL | COMPLETED | "+ JSON.stringify(data));
        return data;
    }
}

async function GET_USERBYID(strID){
    log.PROC_LOGS("GET USER BY ID | "+strID);
    var idx = storedID.indexOf(strID);
    var data = {
        ID: '',
        email: '',
        password: ''
    }

    if(idx > -1) {
        data.ID = storedID[idx];
        data.email = storedEmail[idx];
        data.password = storedPasswords[idx];
        log.PROC_LOGS("GET USER BY EMAIL | COMPLETED | "+JSON.stringify(data));
        return data;
    }

    log.PROC_LOGS("GET USER BY EMAIL | FAIL | "+JSON.stringify(data));
    return data;
}

async function getUserdata(isAuth, ID) {
    log.PROC_LOGS("GET USER DATA | "+isAuth +" | "+ID);
    var dt = model.userData;

    if(!isAuth) {
        dt.username = "GUEST";
        dt.useremail = '',
        dt.data = {}
        return dt;
    } else {
        var idx = storedID.indexOf(ID);
        if(idx > -1){
            dt.username = storedName[idx];
            dt.useremail = storedEmail[idx];
            dt.data = {}
            return dt;
        } else {
            dt.username = "GUEST";
            dt.useremail = '',
            dt.data = {}
            return dt;
        }
    }
}

async function setUserData(userId) {
    
}

module.exports = {
    getUserdata, GET_USERBYEMAIL, GET_USERBYID, InitData
}