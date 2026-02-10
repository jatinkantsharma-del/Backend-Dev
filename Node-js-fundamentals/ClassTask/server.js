const http=require("http");
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end("Server is Running")
})
server.listen(8000,()=>{
    console.log("Server is Running on the port 8000")
})