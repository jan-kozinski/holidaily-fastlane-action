import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, useTheme } from 'utils/theme'

import IconClose from 'assets/icons/icon-close.svg'
import { useNavigation } from '@react-navigation/native'
import { ModalHandleIndicator } from 'components/ModalHandleIndicator'

type PostHeaderProps = {
  left?: React.ReactNode
  right?: React.ReactNode
}

const ICON_SIZE = 16

export const PostHeader = ({ left, right }: PostHeaderProps) => {
  const { t } = useTranslation('createPost')
  const { goBack } = useNavigation()
  const theme = useTheme()
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      padding="l"
      backgroundColor="transparent">
      <Box position="absolute" top={-2}>
        <ModalHandleIndicator />
      </Box>
      <Box position="absolute" right={0} top={4}>
        {left ?? (
          <BaseOpacity padding="m" onPress={() => goBack()}>
            <IconClose color={theme.colors.black} height={ICON_SIZE} width={ICON_SIZE} />
          </BaseOpacity>
        )}
      </Box>
      <Text variant="displayBoldSM" textAlign="center" paddingTop="m">
        {t('title')}
      </Text>
      <Box position="absolute" right={0}>
        {right}
      </Box>
    </Box>
  )
}
