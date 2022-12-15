import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {

    let {title, description, imgurl, newsurl, date, source} = this.props

    return (
      <div className='my-3'>
        <div className="card border-dark rounded">
        <img src={imgurl?imgurl:"https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_960_720.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body bg-dark text-white">
            <h5 className="card-title">{title} <span className="badge badge-danger">{source}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted font-weight-bold">On : {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}
