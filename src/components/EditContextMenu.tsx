import React from 'react'
import { useTranslation } from 'react-i18next'
import { BaseOpacity, Box, Text, theme } from 'utils/theme'
import TrashIcon from 'assets/icons/icon-trash.svg'
import EditIcon from 'assets/icons/icon-edit2.svg'

const TRASH_ICON_SIZE = 21
const EDIT_ICON_SIZE = 19

type MenuTypes = {
  onDeletePress: F0
  onEditPress: F0
}

export const EditContextMenu = ({ onDeletePress, onEditPress }: MenuTypes) => {
  const { t } = useTranslation('feed')

  return (
    <Box
      height={95}
      minWidth={150}
      maxWidth={230}
      backgroundColor="contextMenu"
      position="absolute"
      borderRadius="xm">
      <BaseOpacity
        onPress={onEditPress}
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="l"
        flexDirection="row">
        <Text fontSize={17}>{t('edit')}</Text>
        <EditIcon width={EDIT_ICON_SIZE} height={EDIT_ICON_SIZE} color={theme.colors.alwaysBlack} />
      </BaseOpacity>
      <Box backgroundColor="contextMenuBorder" height={0.5} width={230} />
      <BaseOpacity
        onPress={onDeletePress}
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="l"
        flexDirection="row">
        <Text fontSize={17} color="errorRed">
          {t('delete')}
        </Text>
        <TrashIcon width={TRASH_ICON_SIZE} height={TRASH_ICON_SIZE} color={theme.colors.errorRed} />
      </BaseOpacity>
    </Box>
  )
}
