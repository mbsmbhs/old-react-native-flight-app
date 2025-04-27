import React, { Component } from 'react';
import {
  Container,
  Content,
  Spinner,
  Text
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { tokenSet } from '../actions/flightAction';
import {
  APPSTACKROUTE
} from '../helper/app';

export class LoadingScreen extends Component {

  // disables header
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.token = undefined;
  }

  // getting token
  componentWillMount() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        // console.log(xhr.responsetext)
        var tokenJson = this.responseText.trim('');
        console.log('tokenJson is :' + tokenJson);
        setTokenFunction(tokenJson);

      }
    });

    xhr.open("POST", "https://xxxsxxxs.xx/services/session/token");
    xhr.setRequestHeader("Authorization", "xxx xxxxsxxxs");
    xhr.send(data);

    // setting token to redux store by binding this using arrow function
    setTokenFunction = (tokenJs) => {
      this.props.tokenSet(tokenJs);
      !(tokenJs.indexOf(' ') >= 0) ? (this.props.navigation.navigate(APPSTACKROUTE)) : (this.props.navigation.navigate('ConnectionError'))
    }

  }

  render() {

    return (
      <Container>
        <Content padder >
          <Spinner color='blue' scaleX={3} scaleY={3} />
          <Text>Loading...</Text>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ tokenSet }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(LoadingScreen);