
import React, { Component } from "react";
import NewItem from "./NewsItem";
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        category: "general",
        pageSize: 5,
        sourceColor: "red",

    }
    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number,
        sourceColor: PropTypes.string
    }


    //to capitalize the first letter of title
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalRes: 0,
            loading: false

        }
        document.title = `${this.capitalize(this.props.category)} - Newsapp`;
    }
    //it runs after render
    async componentDidMount() {
        this.updateNews();



    }

    updateNews = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd6881f708bd441bb1b87fa5a540c665&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState(
            {
                articles: parseData.articles,
                totalRes: parseData.totalResults,
                loading: false,

            }
        );
    }

    Next = async () => {

        //     if(this.state.page+1>Math.ceil(this.state.totalRes/this.props.pageSize)){

        //     }else{
        //         this.setState({page:this.state.page+1});
        //         this.updateNews();
        //         console.log(this.state.page);
        // }

        this.setState(
            () => ({ page: this.state.page + 1 }),
            this.updateNews
        );


    }
    Prev = async () => {

        this.setState(
            () => ({ page: this.state.page - 1 }),
            this.updateNews


        );
        console.log(this.state.page);


    }

    fetchMoreData =async () => {
        this.setState({page:this.state.page+1});

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=fd6881f708bd441bb1b87fa5a540c665&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState(
            {
                articles: this.state.articles.concat(parseData.articles),
                totalRes: parseData.totalResults,
                loading: false,

            }
        );
        

      };


    render() {
        return (

            <>
                {/* <div className="container my-5"> */}
                    <h1 className="text-center">{`Top-${this.props.category}-Headlines`}</h1>
                    <hr />


                    {/* it loading is true then only the loading spinner will be visible */}
                    {this.state.loading && <Loading />}
                     <div className="container my-5">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalRes}
                        loader={<Loading/>}
                    >
                        <div className="container">
                        <div className="row">
                            {/* if there is loading do not show the news content */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-3 mb-2" key={element.url}>
                                    <NewItem title={element.title ? element.title.slice(0, 60) + "...." : " "} description={element.description ? element.description.slice(0, 80) + "..." : " "} imgUrl={element.urlToImage} url={element.url}
                                        publishedAt={new Date(element.publishedAt).toGMTString()} author={element.author}
                                        source={element.source.name} sourceColor={this.props.sourceColor} />
                                </div>

                            })}
                        </div>
                        </div>

                    </InfiniteScroll>
                </div>

                {/* <div className="container d-flex justify-content-between mb-5">
                    <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.Prev}> &larr; Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalRes/this.props.pageSize)}  type="button" class="btn btn-dark" onClick={this.Next}>Next &rarr;</button>
                    </div>
                 */}
            </>

        )
    }
}