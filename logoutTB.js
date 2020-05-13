const superagent = require('superagent');
let json={
    "username":"albertocarlosmartin@gmail.com",
     "password":"Martin18*"
}
let jsonAset={
    "name":"Room 1",
    "type":"field"
}
var tokenAccess=null

    
   var req = superagent
    .post('http://localhost:9090/api/auth/login')
    .send(json) // sends a JSON post body
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json')
    .then(res => {
     return res.body.token;
      }, err => {
        if (err.timeout) {
             console.log("TimeOUT")
             return 0;
             }
              else 
              { 
                  console.log("Other Error") 
                  return 1;
                 }
    });
 
 function test(){
     return 1;
 }
    
  var req2=  req.then(res=>{
        
    superagent
    .post('http://localhost:9090/api/auth/logout')
    .send("") // sends a JSON post body
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('X-Authorization','Bearer '+res)
    .end((err, res1) => {
        //console.log(res);
        console.log(res1.text);
     //   console.log(res);
    });

    });


//console.log("TokenAcces\n"+tokenAccess)
 



    