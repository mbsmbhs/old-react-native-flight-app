export function counterBozorgsalPlus() {
  return {
    type: 'COUNTER_BOZORGSAL_PLUS'
  };
}

export function counterBozorgsalMinus() {
  return {
    type: 'COUNTER_BOZORGSAL_Minus'
  };
}

export function counterKhordsalPlus() {
  return {
    type: 'COUNTER_KHORDSAL_PLUS'
  };
}

export function counterKhordsalMinus() {
  return {
    type: 'COUNTER_KHORDSAL_Minus'
  };
}

export function counterNozadPlus() {
  return {
    type: 'COUNTER_NOZAD_PLUS'
  };
}

export function counterNozadMinus() {
  return {
    type: 'COUNTER_NOZAD_Minus'
  };
}

export function returnEnablerDisabler() {
  return {
    type: 'RETURN_ENABLER_DISABLER'
  };
}

export function showAutoComplete(isHidden, which) {
  return {
    type: 'SHOW_AUTO_COMPLETE',
    isHidden: isHidden,
    which: which
  };
}

export function setQuery(query1, which, code, selectedCity) {
  return {
    type: 'SET_QUERY',
    query: query1,
    which: which,
    code: code,
    selectedCity: selectedCity
  };
}

export function equalIndex() {
  return {
    type: 'EQUAL_INDEX',
  };
}

export function setFlightDate(pickedValue, whichDate) {
  return {
    type: 'SET_FLIGHT_DATE',
    date: pickedValue,
    whichDate: whichDate
  };
}

export function setRequestObject() {
  return {
    type: 'SET_REQUEST_OBJECT'
  };
}

export function disabledAndErrorLog() {
  return {
    type: 'DISABLED_AND_ERROR_LOG'
  };
}

export function maleOrFemaleCheck() {
  return {
    type: 'MALE_OR_FEMALE_CHECK'
  };
}

export function setBuyerDetailsObject(person) {
  return {
    type: 'BUYER_DETAILS_OBJECT',
    person: person
  };
}

export function setPassengersDetail(person) {
  return {
    type: 'PASSENGERS_DETAILS_OBJECT',
    person: person
  };
}

export function loggingIn(loginAuth) {
  return {
    type: 'LOGGING_IN',
    loginAuth: loginAuth
  };
}

export function tokenSet(token) {
  return {
    type: 'TOKEN_SET',
    token: token
  };
}

export function loginResponseSet(loginResponseItem) {
  return {
    type: 'LOGIN_RESPONSE_SET',
    loginResponseItem: loginResponseItem
  };
}

export function flightListResponseSet(flightListResponse) {
  return {
    type: 'FLIGHT_LIST_RESPONSE_SET',
    flightListResponse: flightListResponse
  };
}

export function sortAndFilterFlightList(whichTick) {
  return {
    type: 'SORT_AND_FILTER_FLIGHT_LIST',
    whichTick: whichTick
  };
}

export function setSelectedFlight(data) {
  return {
    type: 'SET_SELECTED_FLIGHT',
    data: data
  };
}

export function setPriceRange(value) {
  return {
    type: 'SET_PRICE_RANGE',
    value: value
  };
}

export function setWhichScreen(currentScreen) {
  return {
    type: 'SET_WHICH_SCREEN',
    screen: currentScreen
  };
}

export function switchFlights() {
  return {
    type: 'SWITCH_FLIGHTS'
  };
}

export function setReserveJson(reserveResult) {
  return {
    type: 'SET_RESERVE_JSON',
    reserveJson: reserveResult
  };
}