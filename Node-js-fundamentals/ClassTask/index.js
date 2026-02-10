const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    console.log(`${req.method} ${req.url}`);
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const name = parsedUrl.query.name;

    switch (pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("Welcome to Home Page");
            break;

        case "/about-us":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <h1>About Me</h1>
                <p>Name: ${name}</p>
                <p>Role: Node.js Learner</p>
                <p>College: GLA University</p>
            `);
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("Page Not Found");
    }
});

server.listen(8000, () => {
    console.log("Server is Running on the port 8000");
});
