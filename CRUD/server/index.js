require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const db = require("./dbConnection");
 


const app = express();

app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/api/get', (req, res)=>{

    const query = "SELECT * FROM contact";
    db.query(query, (err,result)=>{
        // console.log(result);
        res.send(result);

    })

})  
 
app.post('/api/insert',(req,res)=>{

    const {title, description} = req.body;
    console.log(title, description)
    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10); // Extract date in 'YYYY-MM-DD' format
    const hours = ('0' + currentDate.getHours()).slice(-2); // Extract hours (with leading zero if necessary)
    const minutes = ('0' + currentDate.getMinutes()).slice(-2); // Extract minutes (with leading zero if necessary)
    
    // Combine hours and minutes into time format
    const time = hours + ':' + minutes;


    const sqlInsert = "INSERT INTO contact (title,description,date,time) VALUES (?,?,?,?)";
    
    db.query(sqlInsert,[title,description,date,time],(error,result)=>{

        if(error){
            console.log("Error : " + error );
        }
        else{
            // console.log(result);
        }

    })

})

app.post('/api/update',(req,res)=>{
    
    const {id, title, description} = req.body;

    const sqlupdate = "UPDATE contact SET title = ?, description = ?  WHERE id = ?";
    db.query(sqlupdate,[title,description,id],(error,result)=>{

        if(error){
            console.log("Error : " + error );
        }
        else{
            // console.log(result);
        }

    })

})


app.post("/api/delete/:id",(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const removeQuery = "DELETE FROM contact WHERE id=?"

    db.query(removeQuery,id,(err,result)=>{
        if(err){
            console.log(err);
        }
    })


})

app.get("/api/getUser/:id",(req,res)=>{

    const {id} = req.params;
    console.log(id)
    
    const getUserQuery = "SELECT * FROM contact WHERE id = ?";

    db.query(getUserQuery, id,(err,result)=>{

        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result)
        }

    } )

})


app.get('/',(req,res)=>{

    // const query = "INSERT INTO contact (name, email, contact) VALUES ('Spider' , 'spider@gmail.com', '8678900238')";
    // db.query(query,(err, result)=>{
        
    //     console.log("Error", err);
    //     console.log("Result", result);
    //     res.send("Good");
    // })

    
})

app.listen(5000,()=>{

    console.log("Server running on port 5000");
 
})    