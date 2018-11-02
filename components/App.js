import React, { Component } from 'react';
import logo from '../yin-yang1.svg';
import '../App.css';
//import TodosRemaining from './TodosRemaining';
//import TodoItem from './TodoItem';
//import TodosCheckAll from './TodosCheckAll';
//import TodosFiltered from './TodosFiltered';
//import TodosClearCompleted from './TodosClearCompleted';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      idForTodo: 5,
      idForCompleted: 2,
      idForActive: 4,
      filter: 'Active',
      todos: [
        {
          'id': 0,
          'title': 'Finish todo list app1',
          'completed': false,
          'editing': false,
        },
        {
          'id': 1,
          'title': 'Do my todo list for today2',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Finish totododo list app3',
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Do my todo list for today4',
          'completed': true,
          'editing': false,
        },
        {
          'id': 4,
          'title': 'Finish todo list app app app5',
          'completed': false,
          'editing': false,
        },
        {
          'id': 5,
          'title': 'Finish6',
          'completed': true,
          'editing': false,
        },
      ],
    };
  }
  todoInput = React.createRef();
  
  addTodo = (event) =>{
    if(event.key === 'Enter')
    {
      const todoInput = this.todoInput.current.value;
      
      if(todoInput.trim().length === 0){
        return;
      }
      
      this.setState((prevState, props) => {
        let todos = prevState.todos;
        let idForTodo = prevState.idForTodo + 1;
        let idForActive = prevState.idForActive + 1;
        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false
        })
        this.todoInput.current.value = '';
        return {idForTodo, idForActive, todos};
      });
    }
  }
  
  removeTodo = (index) =>{
    this.setState((prevState, props) =>{
      let todos = prevState.todos;
      let idForTodo = prevState.idForTodo - 1;
      
      todos.splice(index, 1);
      todos.forEach((i) => {if(i.id > index) i.id--; });
      return {idForTodo, todos};
    });
    
  }
  
  filterAll = () => {
    this.setState((prevState, props) => {
      let filter = prevState.filter;
      filter = 'All';
      return {filter};
    });
  }  
  
  filterActive = () => {
    this.setState((prevState, props) => {
      let filter = prevState.filter;
      filter = 'Active';
      return {filter};
    });
  }  
  
  filterCompleted = () => {
    this.setState((prevState, props) => {
      let filter = prevState.filter;
      filter = 'Completed';
      return {filter};
    });
  }
  
  check = (index) => {
    this.setState((prevState, props) => {
      let todos = prevState.todos;
      let idForActive = prevState.idForActive;
      let idForCompleted = prevState.idForCompleted;
      todos.forEach((i) => {if(i.id === index) i.completed = !i.completed;});
      if(todos[index].completed === true){
        idForActive -= 1;
        idForCompleted += 1;
        return {todos, idForActive, idForCompleted};
      }
      else { 
        idForActive += 1;
        idForCompleted -=1;
        return {todos, idForActive, idForCompleted};
      }
    });
  }
  
  isChecked = (index) => {
    if(this.state.todos[index].completed) return true;
    else return false;
  }
  
  checkAll = () => {
    this.setState((prevState, props) =>{
      let todos = prevState.todos;
      let idForActive = 0;
      let idForCompleted = prevState.idForTodo + 1;
      
      todos.forEach((i) => {i.completed = true});
      
      return {todos, idForActive, idForCompleted};
    })
  }
  
  clearCompleted = () => { //bugged Удаляет элементы через 1
    this.setState((prevState, props) =>{
      let todos = prevState.todos;
      let idForCompleted = 0;
      let idForTodo = prevState.idForTodo;
      let deleted;
      todos.forEach((i) => {
        if(i.completed){
          deleted = i.id;
          idForTodo -= 1;  
          todos.forEach((j) => {
            if(j.id > deleted) {
              j.id--;
            }
          });
          todos.splice(i.id, 1);
        }
      });
      return {todos, idForTodo, idForCompleted};
    })
  }
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className = 'App-info'>
            <p className = 'App-name'>
              T-O-D-O
            </p>
            <a
              className="App-link"
              href="https://github.com/AndreHollow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Andre Hollow
            </a>
          </div>
        </header>
      
        <section className = 'Todo-container'>
          <ul className = 'Todo-list'>
            { this.state.filter === 'All' ?
                this.state.todos.map(item => (
                  <li className = 'Todo-item' key={item.id}>
                    <input id = {item.id} type="checkbox" className = 'checkbox' onClick = {() => this.check(item.id)} checked = {this.isChecked(item.id)} />
                    <p className = {item.completed ? 'Todo-text-crossed' : 'Todo-text'}>{item.title}</p>
                    <div className="remove-item" onClick = {(event) => this.removeTodo(item.id)}>&times;</div>
                  </li>
                ))
              : 
              this.state.filter === 'Active' ?
                this.state.todos.map(item => {
                  if(!item.completed){
                  return <li className = 'Todo-item' key={item.id}>
                    <input type="checkbox" className = 'Uncompleted-box' onClick = {() => this.check(item.id)} />
                    <p className = {item.comleted ? 'Todo-text-crossed' : 'Todo-text'}>{item.title}</p>
                    <div className="remove-item" onClick = {(event) => this.removeTodo(item.id)}>&times;</div>
                  </li>
              }})
              :
              //this.state.filter === 'Completed'
              this.state.todos.map(item => {
                if(item.completed){
                  return <li className = 'Todo-item' key={item.id}>
                    <input type="checkbox" className = 'Completed-box' checked onClick = {() => this.check(item.id)} />
                    <p className = 'Todo-text'>{item.title}</p>
                    <div className="remove-item" onClick = {(event) => this.removeTodo(item.id)}>&times;</div>
                  </li>
              }})
            }
      
          </ul>
        </section>
        
        <section className = 'UpperFooter'>
          <div className = 'UpperFooter-remaining'>
            {this.state.idForActive} tasks remaining
          </div>
          <div className = 'UpperFooter-filter'>
            <button onClick = {this.filterAll}>All</button>
            <button onClick = {this.filterActive}>Active</button>
            <button onClick = {this.filterCompleted}>Completed</button>
          </div>
        </section>

        <footer className = 'App-footer'>
          <div className = 'App-field'>
            <input type = 'text' className = 'todo-input' placeholder = 'What needs to be done' ref ={this.todoInput} onKeyUp = {this.addTodo}/>
          </div>
          <div className = 'Footer-buttons'>
            <button onClick = {() => this.checkAll()}>Check all</button>
            <button onClick = {() => this.clearCompleted()}>Clear Complited</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
