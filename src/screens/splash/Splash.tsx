import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { mkUseStyles, Theme } from 'utils/theme/index'

export const Splash = () => {
  const styles = useStyles()
  const scale = useSharedValue(0)
  const rotate = useSharedValue(0)

  const style = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    }),
    []
  )

  useEffect(() => {
    scale.value = withDelay(200, withSpring(1))
    rotate.value = withDelay(1000, withRepeat(withTiming(-25, { duration: 750 }), -1, true))
  }, [rotate, scale])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, style]}>
        <Animated.Image
          style={styles.image}
          source={require('assets/Splash_screen.png')}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.mainBackground,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
  },
}))
