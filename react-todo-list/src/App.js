import "./App.css";
import Header from "./MyComponent/Header";
import {Todos} from "./MyComponent/Todos";
import {AddTodo} from "./MyComponent/AddTodo";
import {Footer} from "./MyComponent/Footer";
import {About} from "./MyComponent/About";
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }


  const onDelete = (todo)=>{
    console.log("I am on todo",todo);

    //  Deleting this way will not work in react
    //  let index = todos.indexOf(todo);
    //  todos.splice(index,1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    // localStorage.getItem("todos");
    localStorage.setItem("todos",JSON.stringify(todos));

  }

  const addTodo = (title,desc) => {
    let sno;
    if(todos.length===0){
      sno = 0;
    }else{
      sno = todos[todos.length-1].sno+1;
    }
    
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);    
  }
  

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])
  return (
    <>
      <Router>
        <Header title="Todos List" searchBar={false}/>
        <Switch>
          <Route exact path="/" render={()=>{
            return(
              <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
              </>
            )
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        

        <Footer/>
      </Router>
    </>
  );
}

export default App;
