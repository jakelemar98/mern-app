class Auth {
    constructor() {
      this.authenticated = false
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb) {
      localStorage.removeItem('token')
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {      
      var url = process.env.REACT_APP_API_URI + 'user'
      var token = localStorage.getItem("token");  

      if (token){
        return checkAuth(url, token).then( (response) => {        
          this.authenticated = response
          return this.authenticated
        }) ;
      } else {
        this.authenticated = false;
        return this.authenticated;
      }
    }
  }
  
  function checkAuth(url, token) {    
    return fetch(url, {
        method: "GET",
      headers: {
        'Authorization': 'bearer ' + token
      }
    })
      .then(res => res.json())
      .then( (result) => {
          var authenticated = true;
          return authenticated
        },
        (error) => {
          localStorage.removeItem('token')
          var authenticated = false;
          console.log('here in error');
          
          return authenticated;
        }
      )
  }

  export default new Auth();