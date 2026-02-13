const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 8000;

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to th Home Page")
})

const readStudentsFromFile = async()=>{
    const result = await fs.promises.readFile("./students.json","utf-8")
    return JSON.parse(result || "[]")
}

const writeStudentsToFile = async(records)=>{
    await fs.promises.writeFile("./students.json", JSON.stringify(records, null, 2));
}

app.get("/students", async(req, res) => {
    const students= await readStudentsFromFile();
    return res.status(200).json(students);
})

app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {...existingStudents[foundIndex],...req.body,};
    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})




