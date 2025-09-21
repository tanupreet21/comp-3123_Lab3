var http = require("http");
//TODO - Use Employee Module here
const Employee = require("./Employee");
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081;
const serverHost = 'localhost';

//Create Web Server using CORE API
const server = http.createServer((req, res) => {

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type','application/json');
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
        return;
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
            return;
    
        }
        
        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            const employees = Employee.getAllEmployees();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(employees));
            return;
        }
    
        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            const employees = Employee.getAllEmployees();
            const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`);//Build array of names
            names.sort();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(names));
            return;
        }
    
        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            const total = Employee.getTotalSalary();
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.end(`{"total_salary" : "${total}"}`);
            return;
        }
    }
        
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    
});

server.listen(port, serverHost, () => {
    console.log(`Server listening on port ${port}`);
});