import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Button, Header, Left, Icon, Title, Right } from 'native-base';

import SideBar from '../components/SideBar';
import DummyComponent from '../components/SampleReactNativeApp';
import SearchScreen from '../components/SearchScreen';
import LoadinScreen from '../components/LoadingScreen';
import FlightList from '../components/FlightList';
import PassengerDetails from '../components/PassengerPages/PassengerDetails';
import PassengerDetails2 from '../components/PassengerPages/PassengerDetails(page2)';
import Payment from '../components/PassengerPages/PaymentAndTicketDetail';
import Login from '../components/LoginPages/LoginPage';
import LoadingSearchScreen from '../components/SearchScreenLoading';
import ConnectionErrorPage from '../components/ConnectionErrorPage';
import {
  APPSTACKROUTE,
  HOMESTACKDRAWERROUTE,
  DUMMYSTACKDRAWERROUTE,
  FLIGHTLISTSTACKDRAWERROUTE,
  PASSENGERDETAILSTACKDRAWERROUTE,
  PASSENGERDETAIL2STACKDRAWERROUTE,
  PAYMENTANDTICKETSTACKDRAWERROUTE,
  LOGINSTACKROUTE,
  LOADINGSEARCHSCREEN
} from '../helper/app';

export const drawerRoutes = [
  {
    page: HOMESTACKDRAWERROUTE,
    title: 'صفحه اصلی',
    icon: 'put icon here'
  },
  {
    page: DUMMYSTACKDRAWERROUTE,
    title: 'حیف نون',
    icon: 'put second item here'
  },
  {
    page: FLIGHTLISTSTACKDRAWERROUTE,
    title: 'لیست پروازها',
    icon: 'put third item here'
  }
];

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header>
        <Left>
          <Title>
            سقوط آنلاین ایر
          </Title>
        </Left>

        <Right>
          <Button
            transparent
            onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    );
  }
}

const mainStackDrawerRoutes = {};
mainStackDrawerRoutes[HOMESTACKDRAWERROUTE] = { screen: SearchScreen };
mainStackDrawerRoutes[DUMMYSTACKDRAWERROUTE] = { screen: DummyComponent };
mainStackDrawerRoutes[FLIGHTLISTSTACKDRAWERROUTE] = { screen: FlightList };
mainStackDrawerRoutes[PASSENGERDETAILSTACKDRAWERROUTE] = { screen: PassengerDetails };
mainStackDrawerRoutes[PASSENGERDETAIL2STACKDRAWERROUTE] = { screen: PassengerDetails2 };
mainStackDrawerRoutes[PAYMENTANDTICKETSTACKDRAWERROUTE] = { screen: Payment };
mainStackDrawerRoutes[LOGINSTACKROUTE] = { screen: Login };


const AppNavigator = createStackNavigator(
  mainStackDrawerRoutes,
  {
    headerMode: 'screen',
    initialRouteName: HOMESTACKDRAWERROUTE,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader navigation={navigation} />
    })
  }
);


const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />,
    drawerPosition: "right"
  }
);







const mainSwitchRoutes = { AuthLoading: LoadinScreen };
mainSwitchRoutes['ConnectionError'] = ConnectionErrorPage;
mainSwitchRoutes[APPSTACKROUTE] = AppDrawer;
mainSwitchRoutes[LOADINGSEARCHSCREEN] = LoadingSearchScreen;

export default createSwitchNavigator(
  mainSwitchRoutes,
  {
    initialRouteName: 'AuthLoading'
  }
);