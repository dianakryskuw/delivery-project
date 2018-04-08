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
                <div className="input-trackdata-container">
                <InputTrackComponent trackCode={this.props.data.orderReducer.orderId}/>
                </div>
                {this.props.data.trackReducer._id&&<OrderInfoComponent/>}
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