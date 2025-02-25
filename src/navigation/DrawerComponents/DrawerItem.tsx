import React from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Box, Text, theme } from 'utils/theme'
import { isScreenHeightShort } from 'utils/deviceSizes'

type DrawerItemProps = {
  onPress: () => void
  text?: string
  icon?: React.ReactNode
}

export const DrawerItem = ({ icon, text, onPress }: DrawerItemProps) => (
  <Box width="100%">
    <BorderlessButton
      onPress={onPress}
      activeOpacity={0.1}
      borderless={false}
      hitSlop={{ top: 0, bottom: 0, left: 20, right: 40 }}
      rippleColor={theme.colors.newRippleColor}>
      <Box padding="m" flexDirection="row" alignItems="center">
        {icon && <Box marginRight="m">{icon}</Box>}
        <Text
          fontFamily="Nunito-Bold"
          color="black"
          textAlign="center"
          fontSize={isScreenHeightShort ? 16 : 18}
          marginRight="m">
          {text}
        </Text>
      </Box>
    </BorderlessButton>
  </Box>
)
