import React from 'react';
import { connect } from 'react-redux';
import DirectionComponent from './DirectionComponent';
import InputTrackComponent from './InputTrackComponent';

class TrackingComponent extends React.Component{
    constructor(props){
        super(props);
      }

    render(){	
        console.log(this.props.id);
        return(
            <div>
                <div className="input-trackdata-container">
                <InputTrackComponent trackCode={this.props.id}/>
                </div> 
                <h1 style={{
                    display: this.props.data.trackReducer.arrivalDate ? 'block' : 'none'
                }}
                >{"Your order arrives "+this.props.data.trackReducer.arrivalDate||""}</h1>
                <div className="track-map-container">
                    <DirectionComponent/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
      data: state
    })
)(TrackingComponent);