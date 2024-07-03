
import './App.css';
import React,{Component} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {RouterProvider, createBrowserRouter } from 'react-router-dom'


//to install react router dom the command is npm i react-router-dom


export default class App extends Component{
  
   router = createBrowserRouter([
    {
      path: "/",
      element:<><Navbar/>
     <News key="general" pageSize={4} category={"general"}/>
     </>
    },
    {
      path: "/entertainment",
      element:<><Navbar/>
     <News key="entertainment"pageSize={4} category={"entertainment"} sourceColor={"green"}/>
     </>
    },
    {
      path: "/business",
      element:<><Navbar/>
     <News key="business" pageSize={4} category={"business"} sourceColor={"cyan"}/>
     </>
    },
    {
      path: "/health",
      element:<><Navbar/>
     <News key="health" pageSize={4} category={"health"} sourceColor={"pink"}/>
     </>
    },
    {
      path: "/science",
      element:<><Navbar/>
     <News key="science" pageSize={4} category={"science"} sourceColor={"yellow"}/>
     </>
    },{
      path: "/sports",
      element:<><Navbar/>
     <News key="sports" pageSize={4} category={"sports"} sourceColor={"white"}/>
     </>
    },{
      path: "/technology",
      element:<><Navbar/>
     <News key="technology" pageSize={4} category={"technology"} sourceColor={"purple"}/>
     </>
    }
   
  ])
  render(){
    return(
      <>
       <RouterProvider router={this.router}/>
       
       
       </>
    )
  }
}

