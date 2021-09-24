import logo from './logo.svg';
import './App.css';
import { getByTitle } from '@testing-library/dom';
import React from 'react'
import ReactDom from 'react-dom'





function App() {

  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

  const storiesReducer = (state, action) => {
      switch(action.type) {
        case 'STORIES_FETCH_INIT':
          return {
            ...state,
            isLoading:true,
            isError:false,
            
          }
        case 'STORIES_FETCH_SUCCESS':
          return {
            ...state,
            isLoading:false,
            isError:false,
            data: action.payload,

          }
        case 'STORIES_FETCH_FAILURE':
          return {
            ...state,
            isLoading:false,
            isError:true,
          }
        case 'REMOVE_STORY':
          return {
            ...state,
            data: state.data.filter(function(story){
            return story.objectID !== action.payload.objectID
          })

        } 
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
    storiesReducer, {data: [], isLoading:false, isError:false}
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




    
  React.useEffect(() => {
    

    if(!searchTerm) return;



    dispatchStories({
      type:'STORIES_FETCH_INIT'
    })

 


    fetch(`${API_ENDPOINT}${searchTerm}`).then((response) => response.json())
    .then((result) => {
      dispatchStories({
        type:'STORIES_FETCH_SUCCESS',
        payload: result.hits
      })
    } )
    .catch(() => {
      dispatchStories({
        type:'STORIES_FETCH_FAILURE'
      })
    })


  },[searchTerm])






  function handleRemoveStory(item) {
 
    dispatchStories({
      type:'REMOVE_STORY',
      payload:item
    })
  }
    
  function handleSearch(event){
    console.log(event.target.value)
    setSearchTerm(event.target.value)
   
  }
  
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm)}, [searchTerm])

  const searchedStories = stories.data.filter(function(story){
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
     

    {stories.isLoading ? (
      <p>Loading...</p>
    ): (
       <List list={stories.data} onRemoveItem={handleRemoveStory}/>
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
