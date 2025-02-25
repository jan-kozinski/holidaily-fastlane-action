import React, { ReactNode, useEffect, useRef } from 'react'
import { ViewProps } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BaseOpacity, Box, Theme } from 'utils/theme'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import useDimensions from '@shopify/restyle/dist/hooks/useDimensions'
import { SafeAreaWrapper } from 'components/SafeAreaWrapper'
import { BoxProps } from '@shopify/restyle'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'
import { ConfirmationModalProps } from 'types/confirmationModalProps'
import { useOnGoback, useSwipeGestureHandler } from './service/swipeableScreenUtils'

const AnimatedBox = Animated.createAnimatedComponent(Box)

const baseContainerProps: BoxProps<Theme> = {
  flex: 1,
  backgroundColor: 'white',
  overflow: 'hidden',
  marginTop: 'xxl',
  borderTopLeftRadius: 'l2min',
  borderTopRightRadius: 'l2min',
}

export type SwipeableScreenProps = {
  children: ReactNode
  swipeWithIndicator?: true
  extraStyle?: ViewProps['style']
} & Omit<BoxProps<Theme>, 'style'> &
  (
    | { confirmLeave?: never; confirmLeaveOptions?: never }
    | {
        confirmLeave: boolean
        confirmLeaveOptions?: Omit<
          ConfirmationModalProps,
          'onAccept' | 'hideModal' | 'isVisible' | 'onDecline'
        >
      }
  )

export const SwipeableScreen = ({
  children,
  confirmLeave,
  confirmLeaveOptions,
  swipeWithIndicator,
  extraStyle,
  ...extraContainerProps
}: SwipeableScreenProps) => {
  const { height } = useDimensions()
  const { goBack, ...navigation } = useNavigation()
  const translateY = useSharedValue(height)
  const isCloseTriggered = useRef(false)
  useEffect(() => {
    translateY.value = withTiming(0)
  }, [translateY])
  const gestureHandler = useSwipeGestureHandler(translateY)
  const animatedTranslation = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))
  const fadeAway = () => {
    if (!isCloseTriggered.current) {
      isCloseTriggered.current = true
      translateY.value = withTiming(height)
    }
  }
  const fadeBack = () => (translateY.value = withTiming(0))
  const onGoback = useOnGoback({
    onSuccess: fadeAway,
    onFailure: fadeBack,
    confirmLeave,
    confirmLeaveOptions,
  })
  useEffect(() => {
    const subscription = navigation.addListener('beforeRemove', (e) => onGoback(e))
    return subscription
  })

  const onSwipeEnd = () => {
    if (isCloseTriggered.current) return
    if (translateY.value > 140) goBack()
    else translateY.value = withTiming(0)
  }
  const containerProps = { ...baseContainerProps, ...(extraContainerProps ?? {}) }
  const containerStyle: ViewProps['style'] = [animatedTranslation, extraStyle ?? {}]
  if (swipeWithIndicator)
    return (
      <Wrapper>
        <AnimatedBox {...containerProps} style={containerStyle}>
          <PanGestureHandler onGestureEvent={gestureHandler} onEnded={onSwipeEnd}>
            <AnimatedBox height={50} width="100%">
              <ModalHandleIndicator />
            </AnimatedBox>
          </PanGestureHandler>
          {children}
        </AnimatedBox>
      </Wrapper>
    )

  return (
    <Wrapper>
      <PanGestureHandler onGestureEvent={gestureHandler} onEnded={onSwipeEnd}>
        <AnimatedBox {...containerProps} style={containerStyle}>
          {children}
        </AnimatedBox>
      </PanGestureHandler>
    </Wrapper>
  )
}
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaWrapper edges={['top']} isDefaultBgColor>
      <BaseOpacity
        position="absolute"
        style={{ width: '100%', height: '100%' }}
        zIndex="-1"
        onPress={goBack}
      />
      {children}
    </SafeAreaWrapper>
  )
}
