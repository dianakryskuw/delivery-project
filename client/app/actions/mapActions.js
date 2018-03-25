
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getGeoLocation from '../helpers/geoLocation';
import buildDirection from '../helpers/directionBuilder';

export function addDirectionData(dirData) {
    return { type: 'addDirectionData', dirData }
  }
export function  addAddressData(addData) {
    return { type: 'addAddressData', addData }
  }
export function  resetInput(addData) {
    return { type: 'RESET', addData }
  }

export function addMarker(m){

   return dispatch=>{
try{
     buildDirection(this.state.marker1.position, this.state.marker2.position)
              .then(
                result=>  dispatch({ 
                  type: 'addAddress', payload:result
                }),
                error => {
                  alert(error.message);
                  getGeoLocation(m).then(result=>{ this.props.getClick(result)})
                }
               );
              }
              catch(err){
 getGeoLocation(m).then(result=>dispatch({ 
      type: 'addAddress', payload:result
    })
  );
}
              }
}


export function addRoute(pos1,pos2){

  return dispatch=>{
try{
    buildDirection(pos1, pos2)
             .then(
               result=>  dispatch({ 
                 type: 'addRoute', payload:result
               }),
               error => {
                 alert(error.message);
                 //getGeoLocation(m).then(result=>{ this.props.getClick(result)})
               }
              );
             }
             catch(err){
/*getGeoLocation(m).then(result=>dispatch({ 
     type: 'addAddress', payload:result
   })
 );*/
}
             }
}


export function  addAddress(addr,mytype) {
  return dispatch =>{
    geocodeByAddress(addr)
    .then(results => getLatLng(results[0]))
    .then(latLng => { 
      dispatch({ 
        type: 'add'+mytype+'Address', payload:{
          address:addr,
          lat:latLng.lat, 
          lng:latLng.lng
        }  
      })
    })
    .catch(error => console.error('Error', error))
  }
}

export function  addFromAddress(addr) {
  return dispatch =>{
    geocodeByAddress(addr)
    .then(results => getLatLng(results[0]))
    .then(latLng => { 
      dispatch({ 
        type: 'addFromAddress', payload:{
          address:addr,
          lat:latLng.lat, 
          lng:latLng.lng
        }  
      })
    })
    .catch(error => console.error('Error', error))
  }
}