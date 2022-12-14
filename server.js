const express = require("express");
const moment = require("moment")
require("./server/config/db")
const {mongooseStore} = require("./server/config/session")
const passport = require("passport")
const lnJson = require("./server/config/language/index.json")
const app = express();

app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded())
app.use(express.json())
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, rolling:false, saveUninitialized: true, store:mongooseStore }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.moment = moment
    res.locals.ln = "ru"
    res.locals.lnjson = lnJson
    
    let dash = req.url.split("/");
    if(dash.length >= 2) {
        let code = dash[1];
        if(code !== '' && lnJson.hasOwnProperty(code)) {
            res.locals.ln = code;
        }
    }else{
        res.locals.toRu = req.url
        res.locals.toEn = "/en"+req.url
        res.locals.toKz = "/kz"+req.url
    }
    next()
})


app.set("view engine", "ejs");
app.use(require("./server/pages"))
app.use(require("./server/blog/routes"))
app.use(require("./server/auth/routes"))
app.use(require("./server/category/routes"))
app.use(require("./server/comment/routes"))
app.use(require("./server/tag/routes"))

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})
