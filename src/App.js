
import './App.css';
import React,{Component} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


//to install react router dom the command is npm i react-router-dom


export default class App extends Component{

  state={
    progress:10
  }
  setProgress =(progress)=>{
    this.setState({progress:progress})
  }
  
   router = createBrowserRouter([
    {
      path: "/",
      element:<><Navbar></Navbar>
      
     <News setProgress={this.setProgress} key="general" pageSize={4} category={"general"}/>
     </>
    },
    {
      path: "/entertainment",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="entertainment"pageSize={4} category={"entertainment"} sourceColor={"green"}/>
     </>
    },
    {
      path: "/business",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="business" pageSize={4} category={"business"} sourceColor={"cyan"}/>
     </>
    },
    {
      path: "/health",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="health" pageSize={4} category={"health"} sourceColor={"pink"}/>
     </>
    },
    {
      path: "/science",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="science" pageSize={4} category={"science"} sourceColor={"yellow"}/>
     </>
    },{
      path: "/sports",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="sports" pageSize={4} category={"sports"} sourceColor={"white"}/>
     </>
    },{
      path: "/technology",
      element:<><Navbar/>
     <News setProgress={this.setProgress} key="technology" pageSize={4} category={"technology"} sourceColor={"purple"}/>
     </>
    }
   
  ])
  render(){
    return(
      <>
      
       <RouterProvider router={this.router}/>
      
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
       </>
    )
  }
}

