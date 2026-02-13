const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");

// to server static file (CSS, JS, images)
app.use(express.static("public"));
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/public/form.html");
})

app.post("/students/register",(req,res)=>{
    const newStudent = req.body; 
    console.log(req.body);
    fs.readFile("students.json","utf-8",(err,data)=>{
        if(err){
            return res.status(err);
        }

        let students = [];
        if (data.length > 0) {
            students = JSON.parse(data);
        }
        students.push(newStudent);

        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.send("Error");
            }

            res.send("Student Registered");
        });
    });
    })

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
})