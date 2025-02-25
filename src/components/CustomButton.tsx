import React, { FC, ReactNode } from 'react'
import { FlexStyle, ActivityIndicator } from 'react-native'
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { Text, mkUseStyles, Theme, useTheme, BaseOpacity } from 'utils/theme/index'
import IconGoogle from 'assets/icons/icon-google.svg'
import IconApple from 'assets/icons/icon-apple.svg'
import IconPlusSmall from 'assets/icons/icon-plus-small.svg'
import { isAndroid } from 'utils/layout'

type CustomButtonVariants = 'primary' | 'secondary' | 'alternative' | 'danger' | 'tertiary'
type CustomButtonIcons = 'google' | 'apple' | 'plus'

export interface CustomButtonProps extends RectButtonProperties, FlexStyle {
  label: string
  variant?: CustomButtonVariants
  icon?: CustomButtonIcons
  disabled?: boolean
  loading?: boolean
  onPress?: F0
  children?: ReactNode
  customStyle?: RectButtonProperties['style']
  customTextColor?: keyof Theme['colors']
}

export const CustomButton: FC<CustomButtonProps> = ({
  variant = 'secondary',
  label,
  icon,
  disabled = false,
  loading = false,
  onPress,
  children,
  customStyle,
  customTextColor,
  ...rest
}) => {
  const styles = useStyles()
  const theme = useTheme()
  let bgColor
  let borderWidth = 0
  let color = theme.colors.black
  let rippleColor

  switch (variant) {
    case 'primary':
      bgColor = disabled ? theme.colors.primary : theme.colors.tertiary
      color = theme.colors.alwaysWhite
      rippleColor = theme.colors.disabled
      break
    case 'alternative':
      bgColor = disabled ? theme.colors.grey : theme.colors.black
      color = theme.colors.white
      rippleColor = theme.colors.blackBtnRippleColor
      break
    case 'secondary':
      bgColor = theme.colors.white
      color = theme.colors.black
      rippleColor = theme.colors.grey
      borderWidth = 1
      break
    case 'tertiary':
      bgColor = theme.colors.special
      color = theme.colors.alwaysWhite
      rippleColor = theme.colors.grey
      break
    case 'danger':
      bgColor = theme.colors.specialRed
      color = theme.colors.black
      rippleColor = theme.colors.disabled
      borderWidth = 2
      break
    default:
      break
  }

  color = customTextColor ? theme.colors[customTextColor] : color

  return (
    <RectButton
      rippleColor={disabled ? bgColor : rippleColor}
      onPress={!disabled && !isAndroid ? onPress : () => null}
      activeOpacity={disabled ? 0 : 0.2}
      style={[
        styles.container,
        { backgroundColor: bgColor },
        customStyle,
        rest,
        variant === 'tertiary' && styles.smallBtn,
      ]}>
      <BaseOpacity
        activeOpacity={1}
        onPress={!disabled && isAndroid ? onPress : () => null}
        width="100%"
        height={variant === 'tertiary' ? 41 : 47}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={rest.borderWidth ?? borderWidth}
        borderColor={variant === 'secondary' && disabled ? 'grey' : 'black'}
        borderRadius="xxl">
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          children || (
            <>
              {icon === 'google' && <IconGoogle style={styles.icon} />}
              {icon === 'apple' && <IconApple style={styles.icon} />}
              {icon === 'plus' && <IconPlusSmall style={styles.icon} />}
              <Text
                variant={variant === 'tertiary' ? 'buttonSM' : 'buttonMD'}
                style={{ color: variant === 'secondary' && disabled ? rippleColor : color }}
                opacity={disabled && variant === 'primary' ? 0.8 : 1}>
                {label}
              </Text>
            </>
          )
        )}
      </BaseOpacity>
    </RectButton>
  )
}

const useStyles = mkUseStyles((theme: Theme) => ({
  container: {
    marginHorizontal: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: theme.borderRadii.l,
  },
  smallBtn: { borderRadius: theme.borderRadii.l2min },
  icon: {
    marginRight: theme.spacing.s,
  },
}))
