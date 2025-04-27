import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  View,
  Label,
  Input,
  CheckBox,
  Left,
  Right
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  maleOrFemaleCheck,
  setBuyerDetailsObject,
  setWhichScreen
} from '../../actions/flightAction';
import { HOMESTACKDRAWERROUTE } from '../../helper/app';

export class PassengerDetails extends Component {
  constructor(props) {
    super(props);
    this.person = {
      maleOrFemale: (this.props.isMale) ? ('male') : ('female'),
      name: null,
      family: null,
      mobileNo: null,
      codeMelli: null,
      eMail: null
    };
  }

  componentWillMount() {
    this.props.setWhichScreen(currentScreen = this.props.navigation.state.routeName);
  }

  //test json submit
  // submitJson = () => {
  //   let requestData = JSON.stringify(this.props.requestObject)

  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //   xhr.addEventListener("readystatechange", function () {
  //     if (this.readyState === 4) {
  //       console.log(this.responseText);
  //     }
  //   });
  //   xhr.open("POST", "http://tourism.local/appapi/Search");
  //   xhr.setRequestHeader("X-CSRF-Token", "hdbiEDKZJDAJAducyGBtBMK6iUUrxSNihAWhp9BU_xw");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Cookie", "SESS7fe5f450b685d0b36c0c34b8235346de=QPy-AKK1a1suk2au04YL3qGfxurzfWg2IvpjMNvbjY8");
  //   xhr.setRequestHeader("Cache-Control", "no-cache");
  //   xhr.setRequestHeader("Postman-Token", "fce20274-6569-4444-a106-63e96b14f04e");

  //   xhr.send(requestData);
  // }
  //test json submit bottom


  render() {

    return (
      <Container>
        <Content padder >
          <Form>
            <View>
              <View>

                <Text>خریدار</Text>

              </View>

              <Item>
                <View flexDirection='row' padder>

                  <Left>

                    <CheckBox
                      checked={this.props.isMale}
                      onPressIn={() => { this.props.maleOrFemaleCheck() }}
                      onPressOut={() => {
                        this.person.maleOrFemale = (this.props.isMale) ? ('male') : ('female')
                      }}
                    />

                    <Text>مرد</Text>

                  </Left>

                  <Right>

                    <CheckBox
                      checked={!this.props.isMale}
                      onPressIn={() => { this.props.maleOrFemaleCheck() }}
                      onPressOut={() => {
                        this.person.maleOrFemale = (this.props.isMale) ? ('male') : ('female')
                      }}
                    />

                    <Text>زن</Text>

                  </Right>

                </View>
              </Item>

              <Item floatingLabel >

                <Label>نام</Label>
                <Input onChangeText={(text) => { this.person.name = text }} />

              </Item>

              <Item floatingLabel >

                <Label>نام خانوادگی</Label>
                <Input onChangeText={(text) => { this.person.family = text }} />

              </Item>

              <Item floatingLabel >

                <Label>موبایل</Label>

                <Input
                  placeholder='09*********'
                  keyboardType='phone-pad'
                  onChangeText={(text) => { this.person.mobileNo = text }}
                />

              </Item>

              <Item floatingLabel >

                <Label>کد ملی</Label>

                <Input
                  keyboardType='numeric'
                  onChangeText={(text) => { this.person.codeMelli = text }}
                />

              </Item>

              <Item floatingLabel >

                <Label>ایمیل</Label>

                <Input
                  keyboardType='email-address'
                  onChangeText={(text) => { this.person.eMail = text }}
                />

              </Item>

              <View flexDirection='row' >

                {/* error Place */}
                <Text>{this.props.BuyerDetailsError}</Text>
                {/* error Place */}

              </View>

            </View>


            {/* Submit Button (Local) */}

            <Button onPress={() => { this.props.setBuyerDetailsObject(person = this.person) }} >
              <Text>Submit</Text>
            </Button>

            {/* Submit Button bottom*/}


          </Form>

          {/* this button submits created request to webService... ((we can use our error validator here)) */}
          {/* using error validator : if this.props.error==='all is right' then send our request or else kill the user */}
          {/* <Button onPress={() => this.submitJson()} >
            <Text>submit to webService</Text>
          </Button> */}

          <Button onPress={() => (this.props.navigation.navigate(HOMESTACKDRAWERROUTE))} >
            <Text>اتمام (بازگشت به جستجو مجدد)</Text>
          </Button>

        </Content>
      </Container >
    )
  }
}


const mapStateToProps = (state) => {
  return state;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ maleOrFemaleCheck, setBuyerDetailsObject, setWhichScreen }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PassengerDetails);