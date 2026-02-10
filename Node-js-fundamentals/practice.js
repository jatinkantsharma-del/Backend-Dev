const fs = require("fs")
fs.readFile('example.txt', 'utf8', (err,data) =>{
    if(err){
        console.log("File reading error",err)
        return;
    }
    console.log('File Content', data)
})







const fs = require("fs")
const content ="Hello this is a content"
fs.writeFile('Example.txt','content', 'utf8', (err)=>{
    if(err){
        console.log("Cannot write file")
    }
    else{
        console.log("File content", data)
    }
})




const fs = require("fs")
fs.appendFile('log.txt', 'New Log file created',(err)=>{
    if(err) throw err;
    console.log("File appended")
})


const fs = require("fs")
fs.copyFile('source.txt','destination.txt', (err)=>{
    if(err) throw err;
    console.log("File copied")
})



const fs = require ("fs")
fs.unlink('file.txt', (err)=>{
    if(err){
        "File not deleted";
        return;
    }
    console.log("File deleted successfully")
})





const http =require("http")
const server = http.createServerserver((req,res)=>{
    res.writeHead(200, {'content-type': 'plane/text'})
    res.end("Hello World")
})
server.listen(8000,(err)=>{
    console.log("Server Created")
})
