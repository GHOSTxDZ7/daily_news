import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_API_KEY2
  state = {progress: 0}

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
       <Router>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar/>
      <Routes>
            <Route exact path="/" element={<News apikey={this.apikey} setProgress={this.setProgress} key="general" pageSize={9} country="in" category="general"/>}/>
            <Route exact path="/sports" element={<News apikey={this.apikey} setProgress={this.setProgress} key="sports" pageSize={9} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News apikey={this.apikey} setProgress={this.setProgress} key="technology" pageSize={9} country="in" category="technology"/>}/>
            <Route exact path="/entertainment" element={<News apikey={this.apikey} setProgress={this.setProgress} key="entertainment" pageSize={9} country="in" category="entertainment"/>}/>
            <Route exact path="/science" element={<News apikey={this.apikey} setProgress={this.setProgress} key="science" pageSize={9} country="in" category="science"/>}/>
            <Route exact path="/health" element={<News apikey={this.apikey} setProgress={this.setProgress} key="health" pageSize={9} country="in" category="health"/>}/>
            <Route exact path="/business" element={<News apikey={this.apikey} setProgress={this.setProgress} key="business" pageSize={9} country="in" category="business"/>}/>
      </Routes>
      </Router>
      </>
    )
  }
}

