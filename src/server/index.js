const express = require('express');
const session = require('express-session');
const uuid = require('uuid/v4');
const fileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const log = require('./../util/logger.js');
const handler = require('./Handler.js');
const Hash = require('./MD5Hash');

log.U_LOGS("INIT SERVER");
handler.InitData();

passport.use(new passportLocal (
    { usernameField: 'email' },
    (email, password, done) => {
        log.PROC_LOGS("PASSPORT RES | BEGIN LOGIN");
        handler.GET_USERBYEMAIL(email).then((dt) => {
            const user = dt;
            if(user.ID == null || user.email == null || user.password == null){
                log.PROC_LOGS("PASSPORT RES | FAIL USER");
                log.U_LOGS("LOGIN FAILED");
                return done(null, false, {message: "WRONG USERNAME"});
            }

            if(Hash.Hash(password) != user.password) {
                log.PROC_LOGS("PASSPORT RES | FAIL PWD");
                log.U_LOGS("LOGIN FAILED");
                return done(null, false, {message: "WRONG PASSWORD"});
            }

            log.PROC_LOGS("PASSPORT RES | COMPLETED | "+JSON.stringify(dt));
            return done(null, user);
        }). catch(err => done(err));
    }
));

passport.serializeUser((user, done) => {
    log.PROC_LOGS("PASSPORT SERIALIZE | "+user.ID);
    done(null, user.ID);
});

passport.deserializeUser((id, done) => {
    log.PROC_LOGS("PASSPORT DESERIALIZED | "+id);
    handler.GET_USERBYID(id).then((dt) => { 
        log.PROC_LOGS("PASSPORT DESERIALIZE COMPLETE | "+JSON.stringify(dt)); done(null, dt);})
        .catch((err) => {
            log.PROC_LOGS("PASSPORT DESERIALIZED ERROR | "+err);
            done(null, false)});
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        return uuid();
    },
    store: new fileStore({path: './session'}),
    secret: 'cause_sample',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));
app.use('/static', express.static('public'));

app.get('/api', (req, res) => { res.send("<p>NULL</p>"); log.REQUEST_LOGS(req); });

app.get('/web/works/userdata', (req, res) => { 
    log.REQUEST_LOGS(req);
    //if(req.authInfo) {
        if(req.isAuthenticated()) {
        handler.getUserdata(true, req.user.ID).then((r) => {res.send(r); log.RESPONSE_LOGS(JSON.stringify(r));})
        .catch((err) => {
            log.U_LOGS(err);
        });
    } else {
        handler.getUserdata(false, "").then((r) => {res.send(r); log.RESPONSE_LOGS(JSON.stringify(r));})
        .catch((err) => {
            log.U_LOGS(err);
        //    res.status(500).end;
        });
    }
});

app.post('/api/login', (req, res, next) => {
    log.PROC_LOGS("LOGIN | " + JSON.stringify(req.body));
    passport.authenticate('local', (err, user, info) => {
        log.PROC_LOGS("LOGIN POST | "+JSON.stringify(user)+" | "+JSON.stringify(info));
        if(info){return res.send(info);}
        if(err){ return next(err);}
        if(!user){ return res.send("ERROR"); }

        req.login(user, (err) => {
            if(err) {log.PROC_LOGS("LOGIN POST | LOGIN FAILED"); return next(err); }
            log.PROC_LOGS("LOGIN POST | LOGIN SUCCESS");
            return res.redirect('/authOk');
        });
    }) (req, res, next);
});

app.get('/authOk', (req, res) => { 
    if(req.isAuthenticated()){
        //res.send({message: "YOU'RE IN"});
        console.log(req.user);
        log.U_LOGS("AUTH SUCCESS");
        res.send({isAuth: true});
    } else {
        log.U_LOGS("AUTH FAILED");
        res.send({isAuth: false});
    }
});

app.get('/logout', (req, res) => {
    req.logOut();
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

app.get('/endpoint', (req, res) => {
    res.redirect('/authOk');
})

app.get('/login', (req, res) => {
    res.redirect('/');
})

app.get('/race', (req, res) => {
    res.redirect('/');
})

app.listen(8080, () => { 
    log.U_LOGS("START SERVER 8080"); 
});
