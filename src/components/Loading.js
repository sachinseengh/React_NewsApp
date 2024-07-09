import React,{Component} from "react";

import loading from './25.gif';



const Loading =()=>{
        return(
            <>
            <div className="text-center">
            <img src={loading} alt="loading"></img>
            </div>
            </>
        )
  
}
export default Loading