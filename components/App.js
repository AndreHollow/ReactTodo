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
      idForCompleted: 0,
      idForActive: 3,
      filter: 'Active',
      todos: [
        {
          'id': 0,
          'title': 'Finish todo list app',
          'completed': false,
          'editing': false,
        },
        {
          'id': 1,
          'title': 'Do my todo list for today',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Finish totododo list app',
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Do my todo list for today',
          'completed': true,
          'editing': false,
        },
        {
          'id': 4,
          'title': 'Finish todo list app app app',
          'completed': false,
          'editing': false,
        },
        {
          'id': 5,
          'title': 'Finish',
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
        todos.push({
          id: idForTodo,
          title: todoInput,
          completed: false
        })
        this.todoInput.current.value = '';
        return {idForTodo, todos};
      });
    }
  }
  
  removeTodo = (index) =>{
    const removedTodo = this.state.todos[index];
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
      todos.forEach((i) => {if(i.id === index) i.completed = !i.completed;});
      return {todos};
    });
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
                    <input type="checkbox" className = 'checkbox' onClick = {() => this.check(item.id)} />
                    {item.completed ? document.getElementsByClassName('checkbox').checked = true : document.getElementsByClassName('checkbox').checked = false}
                    <p className = {item.comleted ? 'Todo-text-crossed' : 'Todo-text'}>{item.title}</p>
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
            {this.state.idForActive + 1} tasks remaining
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
            <button>Check all</button>
            <button>Complete</button>
            <button>Clear Complited</button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
