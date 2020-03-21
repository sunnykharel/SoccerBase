import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div className="home container">
        <div className="row" style={{backgroundImage : `url(require("src/images/a.png"))`}}>
          
          <h1> HomePage is here</h1>
         
        </div> 
      </div>
    )
  }
}
 
export default Home;