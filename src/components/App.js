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
    this.state = { todos: [
        {
          'id': 1,
          'title': 'Finish todo list app',
          'completed': false,
          'editing': false,
        },
        {
          'id': 1,
          'title': 'Do my todo list for today',
          'completed': false,
          'editing': false,
        }
      ],
    };
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
           
        </section>
      
        <footer className = 'App-footer'>
          <div className = 'App-field'>
            <input type = 'text' className = 'todo-input' placeholder = 'What needs to be done'/>
          </div>
        </footer>
      </div>
    );
  }
}
//          <ul>
//            {this.props.todos.map(item => (
//              <li key={item.id}>{item.title}</li>
//            ))}
//          </ul>
export default App;
