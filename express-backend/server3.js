const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

const readStudentsFromFile = async() => {
    const data = await fs.readFile("./students")
}

app.get("/",async(req,res)=> {
    res.render("form");
})

const PORT = 8000;
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
})