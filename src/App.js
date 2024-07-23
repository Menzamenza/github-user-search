import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



//une class qui effectue le rendu des users 
class UsersApiGit extends Component {

  // gerer comment les users seront rendu dans le DOM avec la methode render
  render() {
    return (
      <div class="container">
        <div class="row ">
          {this.props.users?.map(user => (
            <div key={user.id} className="card col-lg-3 col-md-6 col-sm-10 my-3 offset-1">
              Avatar: <img src={user.avatar_url} />
              <p className='fw-bold'>Login: {user.login}</p>
              <p className='fw-bold'>ID: {user.id}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


// cette class return le logo de react et appelle celle qui affiche les users 
class App extends Component {
  // le consrtucteurs avec comme params props et initialiser les users dans un tableau vide
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: ''
    };
  }
  
  

  
  fetchData(test) {
    fetch(`https://api.github.com/search/users?q=${test}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.items });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  
  
  render() {
    console.log(this.state?.search);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type='text' name='search' id='search' className='rounded' onChange={(e) => this.setState({ search: e.target.value })} />
          <button onClick={()=>this.fetchData(this.state?.search)}>search</button>
          <UsersApiGit users={this.state?.users} />
        </header>
      </div>
    );
  }
}

export default App;
