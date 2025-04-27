import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Button
} from 'native-base';

export default class ConnectionError extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container >
        <Content>

          <Text>ارتباط با سرور برقرار نشد.</Text>

          <Button onPress={() => this.props.navigation.navigate('AuthLoading')} >
            <Text>سعی مجدد</Text>
          </Button>

        </Content>

      </Container>
    )
  }
}