const os = require("os");
const fs= require("fs");

function logSystemInfo(){
    const totalMemory = os.totalmem()/(1024*1024*1024);
    const freeMemory= os.freemem()/(1024*1024*1024);

    const platform= os.platform();
    const uptime= os.uptime()/(3600)

    const model= os.cpus()[0].model;
    const logData = `
    Date: ${new Date().toLocaleString()},
            Platform: ${platform}, 
            CPU Model: ${model}, 
            Total Memory: ${totalMemory} GB, 
            Free Memory: ${freeMemory} GB, 
            Uptime: ${uptime} hours
            `;

    // console.log(totalMemory, freeMemory, platform, uptime, model);

    fs.appendFile("system_logs.txt", logData, (err) => {
        if (err) {
            console.error("Failed to write log file");
            return;
        }
        console.log("System log saved successfully");
    });
}

setInterval(logSystemInfo, 5000)