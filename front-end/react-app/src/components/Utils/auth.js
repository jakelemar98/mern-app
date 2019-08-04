class Auth {
    constructor() {
      this.authenticated = false
      this.userGroup = false
      this.isAdmin = false
    }
  
    login(cb) {
      this.authenticated = true;
      this.userIsAdmin().then( (response) => {
        this.isAdmin = response
        cb(this.isAdmin);
      })
    }
  
    logout(cb) {
      localStorage.removeItem('token')
      this.authenticated = false;
      cb();
    }

    userIsAdmin() {
      var url = process.env.REACT_APP_API_URI + 'user'
      var token = localStorage.getItem("token");  
      if (token){        
        return checkAuth(url, token, true).then( (response) => {                  
          if(response) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          return this.isAdmin
        }) ;
      } else {
        this.authenticated = false;
        localStorage.removeItem('token')
        return this.authenticated;
      }
    }

    isAuthenticated() {            
      var url = process.env.REACT_APP_API_URI + 'user'
      var token = localStorage.getItem("token");  
      if (token){
        return checkAuth(url, token, false).then( (response) => {        
          this.authenticated = response          
          return this.authenticated
        }) ;
      } else {
        this.authenticated = false;
        localStorage.removeItem('token')
        return this.authenticated;
      }
    }
  }
  
  function checkAuth(url, token, getGroup) {    
    return fetch(url, {
        method: "GET",
      headers: {
        'Authorization': 'bearer ' + token
      }
    })
      .then(res => res.json())
      .then( (result) => {
          console.log(result);
          
          if (getGroup) {
            var group = result.user_groups.includes("Admin");
            return group;
          } else {
            var authenticated = result.user_groups.includes("User");
            return authenticated
          }
        },
        (error) => {
          localStorage.removeItem('token')
          var authenticated = false;          
          return authenticated;
        }
      )
  }

  export default new Auth();