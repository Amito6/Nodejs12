const http = require("http");
const query = require("querystring");
const server = http.createServer((request,response)=>{
    if(request.method == "GET"){
    const data = query.parse(request.url.replace("/?",""));
    console.log(data)
    let username = data.username;
    let password = data.password;
    if(username = "a@gmail.com" && password == "12345"){
        response.writeHead(200,{
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        });
        const succRes = JSON.stringify({
            message : "GET authorized"
        });

        response.write(succRes);
        response.end();
    }else{
        //failed

        response.writeHead(401,{
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        });
        const errRes = JSON.stringify({
            message : "not authorized"
        });
        response.write(errRes);
        response.end();
    }
    }
    else{

        let postedData = ""
        request.on("data",(chunks)=>{
        postedData += chunks;
       });

       request.on("end",()=>{
         let data = query.parse(postedData);
         let username = data.username;
         let password = data.password;
         if(username == "a@gmail.com" && password == "12345")
         {
            response.writeHead(200,{
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            });
            const succRes = JSON.stringify({
                message : "Post authorized"
            });
    
            response.write(succRes);
            response.end();
         }
         else{
            response.writeHead(401,{
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            });
            const errRes = JSON.stringify({
                message : "not authorized"
            });
            response.write(errRes);
            response.end();
         }
       });
    }
});


server.listen(2000)