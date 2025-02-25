import { useOneSignal } from 'hooks/useOneSignal'
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserSettingsContextProvider } from 'contexts/UserSettingsProvider'
import { Analytics } from 'services/analytics'
import Smartlook from 'smartlook-react-native-wrapper'
import { SMARTLOOK_API_KEY } from '@env'
import { Main } from './src/Main'

LogBox.ignoreLogs([
  'Require cycle: index.js',
  'Require cycle: node_modules',
  '`new NativeEventEmitter()`',
  'EventEmitter.removeListener',
])

export const queryClient = new QueryClient()

export const App = () => {
  useOneSignal()

  useEffect(() => {
    Analytics().track('APP_LAUNCH')
    if (SMARTLOOK_API_KEY && !__DEV__) Smartlook.setupAndStartRecording(SMARTLOOK_API_KEY)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsContextProvider>
        <Main />
      </UserSettingsContextProvider>
    </QueryClientProvider>
  )
}
