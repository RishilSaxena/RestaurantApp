const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let reservedTables = [];
let waitList = [];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
})
app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"))
})
app.get("/api/reserved", function(req, res){
    res.json(reservedTables);
})
app.get("/api/waitlist", function(req, res){
    res.json(waitList);
})
app.post("/api/reserved", function(req, res){
    const newReservation = req.body;
    console.log(req.body);
    if(reservedTables.length < 5){
        reservedTables.push(newReservation);
    } else{
        waitList.push(newReservation);
    }
    res.json(newReservation);
})
app.listen(PORT, function(){
    console.log("Server listening on port " +  PORT);
})