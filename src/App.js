import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/dom';

function App() {

  function getTitle(title) {
    return title;
  }
  
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
  
  return (
    <div className="App">
      <h1>My Stories</h1>
      <label htmlFor='search'>Search:</label>
      <input id='search' type='text' />
    </div>
  );
}

export default App;
