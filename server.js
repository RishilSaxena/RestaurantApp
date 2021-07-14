const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let reservedTables = [];
let waitList = [];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})
app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"));
})
app.get("/admin", function(req, res){
    res.sendFile(path.join(__dirname, "admin.html"));
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
app.post("/api/adminreserved", function(req, res){
    const reservationToDelete = req.body;
    console.log(reservationToDelete);
    reservedTables.forEach(function(e){
        if(e.phonenumber == reservationToDelete){
            reservedTables.splice(reservedTables.indexOf(e), 1);
            console.log("deleted" + e)
        }
    })   
})
app.post("/api/adminwaitlist", function(req, res){
    const waitlistToDelete = req.body;

    waitList.forEach(function(e){
        if(e.phonenumber == waitlistToDelete){
            waitList.splice(waitList.indexOf(e), 1);
        }
    })   
})
app.listen(PORT, function(){
    console.log("Server listening on port " +  PORT);
})