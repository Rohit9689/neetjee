var jwt = require('jsonwebtoken');
export function tokenChecking(token) {
    if (token == undefined)
    {
        this.props.history.push("/student/login");
    }
    else{
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if (err) {
                console.log("err",err);
              /*
                err = {
                  name: 'TokenExpiredError',
                  message: 'jwt expired',
                  expiredAt: 1408621000
                }
              */
            }
            else{
                console.log("elseelseelse");
            }
          });

    }
            
    
}