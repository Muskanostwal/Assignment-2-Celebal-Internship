const fs = require('fs');
const path = require('path');
const http = require('http');

const filePath = path.join(__dirname, 'data.txt');

const server = http.createServer((req, res) => {
    if (req.url === '/create') {
        // create file
        try {
            fs.writeFileSync(filePath, "I have successfully created the file with help of core modules like file system, http, path and write the program to create , read , delete file");
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("file created successfully");
        } catch (err) {
            res.writeHead(500);
            res.end("error in creation");
        }

    } else if (req.url === '/read') {
        if (fs.existsSync(filePath)) {
            // Read file
            try {
                const data = fs.readFileSync(filePath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            } catch (err) {
                res.writeHead(500);
                res.end("error in reading the file");
            }
        } else {
            res.writeHead(404);
            res.end("no file found");
        }

    } else if (req.url === '/delete') {
        if (fs.existsSync(filePath)) {
            //Delete file
            try {
                fs.unlinkSync(filePath);
                res.writeHead(200);
                res.end("file deleted successfully");
            } catch (err) {
                res.writeHead(500);
                res.end("error in deletion");
            }
        } else {
            res.writeHead(404);
            res.end("no file found to delete");
        }

    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("type : /create - to create a file , /read - to read a file , /delete - to delete the file");
    }
});

server.listen(3000, () => {
    console.log("server is running successfully");
});
