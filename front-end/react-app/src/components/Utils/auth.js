class Auth {
    constructor() {
      this.authenticated = false
      this.userGroup = false
      this.isAdmin = false
      this.url = process.env.REACT_APP_API_URI + 'user'
      this.token = localStorage.getItem("token")
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

    async userIsAdmin() {
      if(localStorage.getItem("token")){
        return checkAuth(this.url, localStorage.getItem("token"), true).then( (response) => {                  
          if(response) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
          return this.isAdmin
        }) ;
      } else {
        return false
      }
    }

    async isAuthenticated() {
        if(localStorage.getItem("token")){
          return checkAuth(this.url, localStorage.getItem("token"), false).then( (response) => {        
            this.authenticated = response                 
            return this.authenticated
          }) ;
        } else {
          return false
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