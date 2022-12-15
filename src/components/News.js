import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spiner from './Spiner';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

constructor(props){
  super(props);
  this.state = {
        articles: [],
        page: 1,
        loading: false,
        totalResults: 0
      };
      document.title = `Daily News-${this.capitalize(this.props.category)}`
  };

  async componentDidMount(){
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(35)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100)
  }

  capitalize = (word) =>
  {   return word.charAt(0).toUpperCase() + word.slice(1)} 

  fetchMoreData = async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page+1
    });
  }


  // handlePreviousClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page-1,
  //     articles: parsedData.articles,
  //     loading: false
  //   });
  // }

  // handleNextClick = async () => {
  //   if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
  //   else
  //   {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true})
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       page: this.state.page+1,
  //       articles: parsedData.articles,
  //       loading: false
  //     });   
  //   }
  // }

  render() {
    return (
      <>
        <h1 className='text-center' style={{marginTop:'90px'}}>Todays Headlines - {this.capitalize(this.props.category)}</h1>
        {/* {this.state.loading && <Spiner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner/>}
        >
          <div className='container my-2'>
            <div className="row" >
              {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} date={element.publishedAt} source={element.source.name} />
                </div>})}
            </div>
          </div> 
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-1" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark mx-1" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
      </>
    )
  }
}

