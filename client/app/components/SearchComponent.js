import React from 'react'
import { connect } from 'react-redux'
import { addAddress } from '../logic'
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
        <PlacesAutocomplete  classNames={{ autocompleteContainer: 'ac-container', input:'my-inpt' }} inputProps={inputProps} onSelect={(event) => this.props.addAddress(event, this.props.type)}/>
        <label >{this.props.name}</label>
      <span class="highlight"></span>
        <span class="bar"></span>
      </div>
    )
  }
}
 
export default connect(
  state => ({
    data:state
  }),
  {addAddress}
)(SearchComponent)