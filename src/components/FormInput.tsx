import React, { forwardRef, useEffect } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Text } from 'utils/theme/index'
import { generateInputErrors } from 'utils/generateInputErrors'
import { useTranslation } from 'react-i18next'
import { CustomInput } from './CustomInput'
import { InputSearchIcon } from './InputSearchIcon'

type FormInputTypes = {
  control: Control
  errors: FieldErrors
  inputLabel: string
  validationPattern: RegExp
  errorMessage: string
  name: string
  isError: boolean
  variant: 'medium' | 'small' | 'mediumSpecial'
  signupPasswordHint?: string
  isPasswordIconVisible?: boolean
  passwordsAreEqual?: boolean
  screenName?: string
  disabled?: boolean
  placeholder?: string
  reset?: F0
  isRequired?: boolean
}

export const FormInput = forwardRef<TextInput, FormInputTypes & TextInputProps>(
  (
    {
      control,
      errors,
      name,
      inputLabel,
      validationPattern,
      errorMessage,
      signupPasswordHint,
      isPasswordIconVisible,
      passwordsAreEqual,
      screenName,
      isError,
      onBlur: onBlurCb,
      isRequired = true,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation('inputErrors')
    const errorOpacity = useSharedValue(0)
    const progressStyle = useAnimatedStyle(() => ({
      opacity: withTiming(errorOpacity.value, {
        duration: 300,
      }),
    }))

    useEffect(() => {
      errorOpacity.value = isError ? 1 : 0
    }, [errorOpacity, isError])

    return (
      <>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <CustomInput
              hasButton={props.variant === 'mediumSpecial'}
              reset={() => onChange('')}
              inputLabel={inputLabel}
              onChangeText={onChange}
              onBlur={(e) => {
                onBlurCb?.(e)
                onBlur()
              }}
              value={value}
              isError={isError}
              ref={ref}
              isPasswordIconVisible={isPasswordIconVisible}
              {...props}
            />
          )}
          name={name}
          rules={{
            required: isRequired ? `${t('requiredField')}` : false,
            pattern: {
              value: validationPattern,
              message: errorMessage,
            },
          }}
          defaultValue=""
        />
        {props.variant === 'small' && <InputSearchIcon />}
        <Animated.View style={progressStyle}>
          <Text variant="inputErrorMessage" marginTop="xs" marginLeft="s">
            {generateInputErrors({ errors, name, passwordsAreEqual, screenName, t })}
          </Text>
        </Animated.View>

        {signupPasswordHint && (
          <Text variant="lightGreyRegular" marginTop="xs" marginLeft="m" textAlign="center">
            {signupPasswordHint}
          </Text>
        )}
      </>
    )
  }
)

FormInput.displayName = 'FormInput'
