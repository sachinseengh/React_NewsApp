import React, { Component } from 'react';

export default class NewItem extends Component {
    render() {
        let { title, description, imgUrl, url, publishedAt, author, source,sourceColor } = this.props;
        return (
            <div className='my-3'>
                <div className="card ">
                    
                    <span class="position-absolute top-0 right-0 end-0 translate-start  badge rounded-pill " style={{backgroundColor:`${sourceColor}
                    `}}>
                        
                        {source}
                        
                      
                    </span>
                    
                    <img src={imgUrl} className="card-img-top" alt="..." style={{ height: "160px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author ? "unknown" : author} updated on {publishedAt}</small></p>
                        <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>


                    </div>
                </div>
            </div>
        )
    }
}


