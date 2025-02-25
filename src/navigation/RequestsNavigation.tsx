import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { SeeRequest } from 'components/RequestDetails/SeeRequest'
import { RequestsRoutes } from './types'
import { StatsAndRequests } from '../screens/stats/StatsAndRequests'

const RequestsStack = createStackNavigator<RequestsRoutes>()

export const RequestsNavigation = () => (
  <RequestsStack.Navigator
    initialRouteName="STATS_AND_REQUESTS"
    screenOptions={{ headerShown: false }}>
    <RequestsStack.Screen name="STATS_AND_REQUESTS" component={StatsAndRequests} />
    <RequestsStack.Screen
      name="SEE_REQUEST"
      component={SeeRequest}
      options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    />
  </RequestsStack.Navigator>
)
