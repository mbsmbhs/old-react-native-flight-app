import React, { Component } from 'react';
import {
  Container,
  Content,
  Spinner
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import { flightListResponseSet, setWhichScreen, sortAndFilterFlightList } from '../actions/flightAction';
import { FLIGHTLISTSTACKDRAWERROUTE, HOMESTACKDRAWERROUTE } from '../helper/app';




export class SearchScreenLoading extends Component {

  // disables header
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.responseForTimeOut = null;
  }

  componentWillMount() {
    this.props.setWhichScreen(currentScreen = this.props.navigation.state.routeName);
    this.props.navigation.drawerLockMode = 'locked-closed'
  }

  // json submit  // validators for server response should be created later (example [] is empty or server error test)
  componentDidMount() {

    let requestData = JSON.stringify(this.props.requestObject)

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        // console.log(this.responseText[1]);


        // IMPORTANT مهم IMPORTANT
        //checks this.responseText[1] if it is [ assume its array elseits error... very dependant on web service


        var flightListResponse = ((this.responseText[1] === '[') ? (JSON.parse(this.responseText)) : ('error'));
        console.log(flightListResponse);
        submitFlightSearchResponse(flightListResponse);
      }
    });

    xhr.open("POST", "https://asantik.ir/appapi/Search");
    xhr.setRequestHeader("X-CSRF-Token", this.props.token);
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("Cookie", "a");       //set coockies later based on login check connection
    xhr.setRequestHeader("Authorization", "Basic dGlrOnRpa3Rpaw==");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "f3289469-0a47-48ed-985d-219564eefb0b");

    xhr.send(requestData);


    //setting time out down here and if response was get setting to null to get ready for next search
    setTimeout(() => {
      (
        this.responseForTimeOut === null) ? (
          submitFlightSearchResponse('error')
        ) : (
          this.responseForTimeOut = null
        )
    }, 65000)
    //setting time out up here

    submitFlightSearchResponse = (flightListResponse) => {
      (flightListResponse !== 'error') ? (
        this.props.flightListResponseSet(flightListResponse),
        this.props.navigation.navigate(FLIGHTLISTSTACKDRAWERROUTE),
        this.props.sortAndFilterFlightList(whichTick = 'setup'),
        this.responseForTimeOut = 'done'
      ) : (
          alert('ارتباط با سرور برقرار نشد'),
          this.props.navigation.navigate(HOMESTACKDRAWERROUTE),
          this.responseForTimeOut = 'done'
        )
    };
  }
  // json submit bottom


  onBackButtonPressAndroid = () => {
    console.log("Obey me!!! I'm the master here...")
    return true;
  };


  render() {


    return (
      <Container>
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>

          <Content padder >

            <Spinner />

          </Content>

        </AndroidBackHandler>
      </Container >
    )
  }
}


const mapStateToProps = (state) => {
  return state;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ flightListResponseSet, setWhichScreen, sortAndFilterFlightList }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchScreenLoading);