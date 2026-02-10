const http= require("http")
const url= require("url")
const fs = require("fs")

const server= http.createServer((req,res)=>{
    const parsedUrl= url.parse(req.url,true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if(pathname==="/complain"){
        const name= query.name;
        const issue = query.issue;
        const priority = query.priority;

        const ticketID = "Ticket" + Math.floor(Math.random()*10000);
        const complaintData = `Ticket ID: ${ticketID} Name: ${name} Issue: ${issue} Priority: ${priority} Date: ${new Date().toLocaleString()}`;

        if(priority.toLowerCase()==="high"){
            const fileName = "Urgent.txt";
        }
        else{
            const fileName= "Normal.txt";
        }

        fs.appendFile(fileName, complaintData,(err)=>{
            if(err){
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to save complaint" }));
                return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ticketId: ticketId, message: "We will solve your issue soon."}));
            

        })
    }
    else{
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }

    })
    server.listen(8000, () => {
    console.log("Server is Running on the port 8000");
    });

