import React, { useState,useEffect} from "react";

import NewItem from "./NewsItem";
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const  News =(props)=> {

 const [articles,setArticles]=useState([]);
 const [page,setPage]=useState(1);
 const [totalRes,setTotalRes]=useState(0);
 const [loading,setLoading]=useState(false);


  const  capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalize(props.category)} - Newsapp`;

    

    
   useEffect(()=>{
      updateNews();
      // eslint-disable-next-line
   },[])

    

  const  updateNews = async () => {
        props.setProgress(0)
        
        let url =`https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalRes(parseData.totalResults);
        setLoading(false);
       
        props.setProgress(100);
    }

  

   const  fetchMoreData = async () => {



        
            
    
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
                
       //as it is a asynchronous function it takes some time to update   
                setPage(page+1);
                setLoading(true);
                let data = await fetch(url);
                let parseData = await data.json();


                setArticles(articles.concat(parseData.articles));
                setTotalRes(parseData.totalResults);
                setLoading(false);
                
            
        
    };
    

    
        return (
            <>
                <h1 className="text-center " style={{marginTop:'90px'}}>{`Top-${props.category}-Headlines`}</h1>
                <hr />
                {loading && <Loading />}
                <div className="container my-1">
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalRes}
                        loader={<Loading />}
                    >
                        <div className="container">
                            <div className="row">
                                {articles.map((element, index) => {
                                    return (
                                        <div className="col-md-3 mb-2" key={`${index}-${element.url}`}>
                                            <NewItem
                                                title={element.title ? element.title.slice(0, 60) + "...." : " "}
                                                description={element.description ? element.description.slice(0, 80) + "..." : " "}
                                                imgUrl={element.urlToImage}
                                                url={element.url}
                                                publishedAt={new Date(element.publishedAt).toGMTString()}
                                                author={element.author}
                                                source={element.source.name}
                                                sourceColor={props.sourceColor}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    
}

News.defaultProps = {
    category: "general",
    pageSize: 5,
    sourceColor: "red",
}

News.propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    sourceColor: PropTypes.string,

}
export default News