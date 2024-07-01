
import React,{Component} from "react";
import NewItem from "./NewsItem";

export default class News extends Component{
 
   

    constructor(){
        super();
        console.log("i am news item");

        this.state={
            articles:[],

        }
    }
//it runs after render
   async componentDidMount(){
    let url ="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fd6881f708bd441bb1b87fa5a540c665";
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles:parseData.articles});
   }
    render(){
        return(

            <div>
                <div className="container my-5">
                    <h1>Top-Headlines</h1>
                    <hr />
                    <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col md-3 mb-5" key={element.url}>
                        <NewItem title={element.title?element.title.slice(0,60)+"....":" "} description={element.description?element.description.slice(0,80)+"...": " "} imgUrl={element.urlToImage} url={element.url}/>
                        </div>
                        
                    })}
                        </div>
                        
                    </div>
                
             
                </div>
            
        )
    }
}