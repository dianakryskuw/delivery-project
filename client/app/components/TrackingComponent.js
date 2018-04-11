import React from 'react';
import { connect } from 'react-redux';
import DirectionComponent from './DirectionComponent';
import InputTrackComponent from './InputTrackComponent';
import OrderInfoComponent from './OrderInfoComponent';

class TrackingComponent extends React.Component{
    constructor(props){
        super(props);
      }

    render(){	
        return(
            <div>
                <div className="map-container">
                    <DirectionComponent/>
                
                </div>
                <div className="input-data-container">
                <InputTrackComponent trackCode={this.props.match.params.id}/>
                </div>
                {this.props.data.trackReducer._id&&<OrderInfoComponent/>}                 
            </div>
        )
    }
}

export default connect(
    state => ({
      data: state
    })
)(TrackingComponent);