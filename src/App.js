
import './App.css';
import {getTask} from './api/api'
import {Paper,TextField,Checkbox,Button} from '@material-ui/core'
import React, { useState, useEffect, Component } from "react";
import { Todo } from './Todo';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import { format } from 'date-fns';


class App extends Component {

 

  
  render(){

 
  
    return (
      <div className="App flex">
      
      <Switch>
      <Route exact path="/">
        <Todo />
        </Route>
      </Switch>
       
      
     
  
  
  
      </div>
    );
  }


  
}

export default App;
