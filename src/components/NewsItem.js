import React,{Component} from 'react';

export default class NewItem extends Component{
    render(){
        let {title ,description,imgUrl,url} = this.props;
        return(
            <div>
            <div class="card" style={{width: "18rem"}}>
            <img src={imgUrl} class="card-img-top" alt="..." style={{height:"160px"}}/>
            <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">{description}</p>
            <a href={url} target="_blank" class="btn btn-sm btn-primary">Read More</a>
            </div>
            </div>
            </div>
        )
    }
}


