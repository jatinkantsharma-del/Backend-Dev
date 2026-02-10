const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json()); 

const PORT = 8000;

app.get("/", (req, res) => {
    res.send("Welcome to the home Page");
});

app.get("/students", (req, res) => {
    const branch = req.query.branch;

    if (!branch) {
        res.json(students);
        return;
    }

    res.json(students.filter(s => s.branch === branch));
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile("./students.json", "utf-8",(err, data)=>{
        if(err){
            return res.status(500).send("Error whileaccessing data")
        
        }

        const students = JSON.parse(data);
        const student = students.find(s => s.id === id);

    if (!student) {
        res.send("Student not found");
        return;
    }

    res.json(student);
})
});

app.post("/students/register", (req, res) => {
    const {name, branch,id} = req.body;
    if(!name || !branch) return res.status(400).send("Details Missing");

    fs.readFile("./students.json", "utf-8",(err, data)=>{
        if(err){
            return res.status(500).send("Error whileaccessing data")
        }
        const students = JSON.parse(data);
        
        students.push({
            id,
            name,
            branch
        })

        fs.writeFile("students.json", JSON.stringify(students,null,2),(err)=>{
            if(err){
                return res.status(500).send("Error while saving data")
            }
        })

        return res.status(200).json(students)
    }
    )
});

app.put("/students/:id", (req,res) =>{
    const userId = parseInt(req.params.id);
    fs.readFile("students.json", "utf-8",(err, data)=>{
        if(err){
            return res.status(500).send("Error whileaccessing data")
        }
        const students = JSON.parse(data);
        const foundIndex = students.findIndex( s => s.id === userId);

    if(foundIndex == -1){
        return res.status(404).send("Student Not Found");
    }

    students[foundIndex] = { ...students[foundIndex], ...req.body };

    fs.writeFile("students.json", JSON.stringify(students,null, 2),(err)=>{
        if(err){
            return res.status(500).send("Student not found");
        }
        return res.status(200).json(students)
    })
})
})

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})
