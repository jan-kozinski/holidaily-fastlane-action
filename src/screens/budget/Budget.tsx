import React, { useCallback } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box } from 'utils/theme'
import GestureRecognizer from 'react-native-swipe-gestures'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { AppNavigationType, BudgetNavigationType } from 'navigation/types'
import { DrawerBackArrow } from 'components/DrawerBackArrow'
import { useTranslation } from 'react-i18next'
import { useUserContext } from 'hooks/context-hooks/useUserContext'
import { useFetchUserStats } from 'dataAccess/queries/useFetchUserStats'
import { LoadingModal } from 'components/LoadingModal'
import { Section } from './components/Section'

export const Budget = () => {
  const navigation = useNavigation<AppNavigationType<'DRAWER_NAVIGATOR'>>()
  const { t } = useTranslation('budget')
  const { data: stats, isLoading: loadingStats } = useFetchUserStats()
  const { user } = useUserContext()
  const { navigate } = useNavigation<BudgetNavigationType<'BUDGET'>>()

  const handleGoBack = useCallback(() => {
    navigation.goBack()
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])
  const isLoading = loadingStats || !user || !stats
  if (isLoading) return <LoadingModal show />
  return (
    <SafeAreaWrapper>
      <GestureRecognizer onSwipeRight={handleGoBack} style={{ flex: 1 }}>
        <DrawerBackArrow goBack={handleGoBack} title={t('budget')} />
        <Box paddingHorizontal="m" paddingTop="lplus">
          <BaseOpacity activeOpacity={0.8} onPress={() => navigate('PTO_POLICY')}>
            <Section variant="left" duration={user.availablePto ?? 0} />
          </BaseOpacity>
          <Section variant="sick" duration={+stats.sickdaysTaken ?? 0} />
        </Box>
      </GestureRecognizer>
    </SafeAreaWrapper>
  )
}
