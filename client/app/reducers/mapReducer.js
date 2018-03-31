import * as types from '../constants/actionTypes';

const initialState = {
};

export default function setMapData(state=initialState, action) {
    switch (action.type) {
    
        case 'addAddress':{
            var data=action.payload;
            var d=state.markers||[]
            d=[d[1],d[0]];
            return {
                    markers: [d[0],{
                        lat:data&&data.lat,
                        lng:data&&data.lng,
                        address:data&&data.address,
                     }],
                     distance: state.distance, 
                     time: state.time,
                     direction: state.direction
                }
            } 
            case 'addBounds':{
                var data=action.payload;
                return {
                    bounds:data.bounds
                }

                } 
            case 'addFromAddress':{
                var data=action.payload;
                var d=state.markers||[]
                return {
                        markers: [{
                            lat:data&&data.lat,
                            lng:data&&data.lng,
                            address:data&&data.address,
                         },d[1]],
                         distance: state.distance, 
                         time: state.time,
                         direction: state.direction
                    }
                } 
                 case 'addToAddress':{
                    var data=action.payload;
                    var d=state.markers||[]
                    return {
                            markers: [d[0],{
                                lat:data&&data.lat,
                                lng:data&&data.lng,
                                address:data&&data.address,
                             }],
                             distance: state.distance, 
                             time: state.time,
                             direction: state.direction
                        }
                    } 
            case 'addRoute':{
                var data=action.payload.routes[0].legs[0];
                console.log(state)
                return {
                    markers:state.markers,
                    distance: data.distance, 
                    time: data.duration,
                    direction: action.payload
                    }
                }

    case 'RESET':{
        return action.payload;
    }
    default:
    return state;
    } 
  }