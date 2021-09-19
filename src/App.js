import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/dom';
import React from 'react'
import ReactDom from 'react-dom'





function App() {

  const stories = [
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
  
  const [searchTerm, setSearchTerm] = React.useState('React')

  function handleSearch(event){
    setSearchTerm(event.target.value)
   
  }
  
  const searchedStories = stories.filter(function(story){
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="App">
      <h1>My Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
     {/* Creating first instance of list */}
      <List list={searchedStories}/>

    </div>
  )
}



function List(props) {
  return (
    <ul>
      {props.list.map(function(item){
        return(

        <Item key={item.objectID} item={item} />

        )
      })}

    </ul>
  )
}


function Search({search, onSearch}){
 

 

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' value={search} onChange={onSearch} />

    </div>
  )
}


function Item(props){

  return (

  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
  )
}


export default App;
