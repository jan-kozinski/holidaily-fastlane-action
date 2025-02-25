import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Budget } from 'screens/budget/Budget'
import { PtoPolicy } from 'screens/budget/PtoPolicy'
import { BudgetRoutes } from './types'

const BudgetStack = createStackNavigator<BudgetRoutes>()

export const BudgetNavigation = () => (
  <BudgetStack.Navigator headerMode="none" screenOptions={TransitionPresets.SlideFromRightIOS}>
    <BudgetStack.Screen name="BUDGET" component={Budget} />
    <BudgetStack.Screen name="PTO_POLICY" component={PtoPolicy} />
  </BudgetStack.Navigator>
)
