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
        sourceColor: PropTypes.string,
    
    }

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

    async componentDidMount() {
        this.updateNews();
    }

    updateNews = async () => {
        this.props.setProgress(0)
        console.log(this.props.apiKey);
        let url =`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(url);
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalRes: parseData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

  

    fetchMoreData = async () => {
        this.setState(
            { page: this.state.page + 1 },
            async () => {
              
    
                let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
                console.log(url);
                this.setState({ loading: true });
                let data = await fetch(url);
                let parseData = await data.json();
                this.setState({
                    articles: this.state.articles.concat(parseData.articles),
                    totalRes: parseData.totalResults,
                    loading: false,
                });
            }
        );
    };
    

    render() {
        return (
            <>
                <h1 className="text-center my-4">{`Top-${this.props.category}-Headlines`}</h1>
                <hr />
                {this.state.loading && <Loading />}
                <div className="container my-1">
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalRes}
                        loader={<Loading />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element, index) => {
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
                                                sourceColor={this.props.sourceColor}
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
}
