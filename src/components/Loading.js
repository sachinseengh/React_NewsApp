import React,{Component} from "react";

import loading from './25.gif';



export default class Loading extends Component{
    render(){
        return(
            <>
            <div className="text-center">
            <img src={loading} alt="loading"></img>
            </div>
            </>
        )
    }
}