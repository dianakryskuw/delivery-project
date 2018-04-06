import React from 'react'
import { connect } from 'react-redux'
import { addAddress } from '../actions/mapActions';
import PlacesAutocomplete from 'react-places-autocomplete'
 
class SearchComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }
 
  componentWillReceiveProps(nextProps) {
      this.setState({address: nextProps.text});
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    return (
      <div class="group">  
        <PlacesAutocomplete classNames={{ autocompleteContainer: 'ac-container' }} inputProps={inputProps} onSelect={(event) => this.props.getAddress(event, this.props.type)}/>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label >Arrival address:</label>
      </div>
    )
  }
}
 
export default connect(
  state => ({
    data:state
  }),
  dispatch => ({
    getAddress: (currentData,type) => {
        dispatch(addAddress(currentData,type));
    }
  })
)(SearchComponent)