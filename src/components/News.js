
import React,{Component} from "react";
import NewItem from "./NewsItem";

export default class News extends Component{
    render(){
        return(

            <div>
                This is News Component

                <NewItem/>
                <NewItem/>
                <NewItem/>
                <NewItem/>
                <NewItem/>
            </div>
        )
    }
}