import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/dom';
import React from 'react'
import ReactDom from 'react-dom'





function App() {

  const storiesReducer = (state, action) => {
    if (action.type === 'SET_STORIES') {
      return action.payload
    } else if (action.type = 'REMOVE_STORY'){
      return state.filter( function(story) {
        return action.payload.objectID !== story.objectID
      }

      )
    }  else {
      throw new Error();
    }
  }

  const initialStories = [
    {title:'React',
      url:'https://reactjs.org/',
      author:'Jordan Walke',
      num_comments: 3,
      points: 4, 
      objectID: 0,
    },
    {
      title:'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abrmaov, Andrew Clark',
      num_comments:2,
      points:5,
      objectID: 1,

    }
  ]
  
  
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, []
  )

  const getAsyncStories = () =>
    new Promise((resolve) => {
      setTimeout(
        () => resolve({data: {stories:initialStories}}),
        2000
      )
    })

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || "React"
  )



  const [isLoading, setIsLoading] = React.useState(false)
    
  React.useEffect(() => {
    
    setIsLoading(true)

 


    getAsyncStories().then((result) => {
      dispatchStories({
        type:'SET_STORIES',
        payload: result.data.stories
      })
      setIsLoading(false)
    })
    
    
  }, [])






  function handleRemoveStory(item) {

    dispatchStories({
      type:'REMOVE_STORY',
      payload:item
    })
  }
    
  function handleSearch(event){
    setSearchTerm(event.target.value)
   
  }
  
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm)}, [searchTerm])

  const searchedStories = stories.filter(function(story){
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="App">
      <h1>My Stories</h1>
      
     <InputWithLabel
      id='search'
      label='Search'
      value={searchTerm}
      onInputChange={handleSearch}>
        <strong>Search:</strong>
     </InputWithLabel>
     {/* Creating first instance of list */}
     

    {isLoading ? (
      <p>Loading...</p>
    ): (
       <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    )}

    </div>
  )
}



function List(props) {
  return (
    <ul>
      {props.list.map(function(item){
        return(

        <Item key={item.objectID} item={item} onRemoveItem={props.onRemoveItem} />

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

  function handleRemoveItem(){
    props.onRemoveItem(props.item)
    console.log(props.item)
  }

  return (

  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
    <span>
      <button type='button' onClick={handleRemoveItem}>
        Dismiss
      </button>
    </span>
  </li>
  )
}

function InputWithLabel({id, label, value, type='text', onInputChange, children}) {

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} value={value} type={type} onChange={onInputChange}/>
    </>

  )

}


export default App;
