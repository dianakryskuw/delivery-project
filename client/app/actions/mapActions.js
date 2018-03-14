export function addDirectionData(dirData) {
    return { type: 'addDirectionData', dirData }
  }
export function  addAddressData(addData) {
    return { type: 'addAddressData', addData }
  }
export function  resetInput(addData) {
    return { type: 'RESET', addData }
  }