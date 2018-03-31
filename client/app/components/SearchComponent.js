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
        <PlacesAutocomplete inputProps={inputProps} onSelect={(event) => this.props.getAddress(event, this.props.type)}/>
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