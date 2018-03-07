import React from 'react';
import MapComponent from "./MapComponent"

export default class Api extends React.Component {  
    constructor(props) {
      super(props)
      this.state = {
        lat:'',
        lng:''
      }
    }
    render() {
   const location={
         lat:Number(this.state.lat),
         lng:Number(this.state.lng)
       }
      
       const markers=[
         {  
           location:  {
             lat:Number(this.state.lat),
             lng:Number(this.state.lng)
           }
         }
       ]
      return (
      <div> 
             <div style={{width:'100%', height:500}} className="col-sm-12">
                        <MapComponent data={this.state} center={location} markers={markers} />
                    </div>
       </div>
      )
    }
  }