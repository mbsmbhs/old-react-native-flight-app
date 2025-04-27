import React, { Component } from 'react';
import { Container, Content, Text, Body, Button, Right, Left, View, Card, List } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setWhichScreen } from '../../actions/flightAction';
import { PASSENGERDETAILSTACKDRAWERROUTE } from '../../helper/app';


export class Payment extends Component {

  componentWillMount() {
    this.props.setWhichScreen(currentScreen = this.props.navigation.state.routeName);
  }

  render() {
    return (
      <Container>

        <Content>

          <View>
            <View>
              <View width={300} >
                {/* flights */}
                <View>
                  <Text>پرواز رفت</Text>
                  {/* flight list with/without stops */}
                  <List dataArray={this.props.resrveResult.to} renderRow={data1 => {
                    return (
                      <View width={280}>
                        <View padder flexDirection='row' >
                          <Left><Text>{data1.flightNumber}</Text></Left>
                          <Right><Text>{data1.time}</Text></Right>
                        </View>
                        <View flexDirection='row' >
                          <Left><Text>{data1.source}</Text></Left>
                          <Right><Text>{data1.destination}</Text></Right>
                        </View>
                        <View flexDirection='row' >
                          <Left><Text>{data1.price}</Text></Left>
                          <Right><Text>{data1.date}</Text></Right>
                        </View>
                        <View flexDirection='row' >
                          <Left><Text>{data1.airline}</Text></Left>
                          <Right><Text>{data1.reservable}</Text></Right>
                        </View>
                      </View>
                    )
                  }} />

                </View>

                {/* return flights */}
                {(this.props.resrveResult.return) ? (
                  <View>
                    <Text>پرواز بازگشت</Text>
                    {/* return flight list with/without stops */}
                    <List dataArray={this.props.resrveResult.return} renderRow={data2 => {
                      return (
                        <View width={280}>
                          <View padder flexDirection='row' >
                            <Left><Text>{data2.flightNumber}</Text></Left>
                            <Right><Text>{data2.time}</Text></Right>
                          </View>
                          <View flexDirection='row' >
                            <Left><Text>{data2.source}</Text></Left>
                            <Right><Text>{data2.destination}</Text></Right>
                          </View>
                          <View flexDirection='row' >
                            <Left><Text>{data2.price}</Text></Left>
                            <Right><Text>{data2.date}</Text></Right>
                          </View>
                          <View flexDirection='row' >
                            <Left><Text>{data2.airline}</Text></Left>
                            <Right><Text>{data2.reservable}</Text></Right>
                          </View>
                        </View>
                      )
                    }} />
                  </View>
                ) : (<View />)}
              </View>
            </View>

            <Button rounded onPress={() => this.props.navigation.navigate(PASSENGERDETAILSTACKDRAWERROUTE)} ><Text>تایید و پرداخت</Text></Button>

          </View>
        </Content>
      </Container>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ setWhichScreen }, dispatch)
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, matchDispatchToProps)(Payment);