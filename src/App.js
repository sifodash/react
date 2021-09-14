import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/dom';


const list = [
  {
    title:'React',
    url: 'https://reactjs.org',
    author:'Jordan Walke',
    num_comments: 3,
    points:4,
    objectID:0,

  },

  {
    title:'Redux',
    url:'https://redux.js.org',
    author:'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]



function App() {


  

  
  return (
    <div className="App">
      <h1>My Stories</h1>
     {/* Creating first instance of list */}
      <List />
      {/* Creating second instance of list */}
      <List />
    </div>
  )
}



function List() {
  return (
    <ul>
      {list.map(function(item){
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        )
      })}

    </ul>
  )
}


function Search(){
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' />

    </div>
  )
}

export default App;
