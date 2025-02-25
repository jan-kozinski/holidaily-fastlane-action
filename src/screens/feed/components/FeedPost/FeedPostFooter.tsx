import React from 'react'
import { FeedPost } from 'mock-api/models/miragePostTypes'
import { Box } from 'utils/theme'
import { isIos } from 'utils/layout'
import { useBooleanState } from 'hooks/useBooleanState'
import { isScreenHeightShort } from 'utils/deviceSizes'
import { CommentBox } from '../CommentBox/CommentBox'
import { FooterBar } from '../FooterBar/FooterBar'

type Post = { post: FeedPost }

export const FeedPostFooter = ({ post }: Post) => {
  const [areCommentsExpanded, { toggle: toggleCommentsExpanded, setTrue: expandComments }] =
    useBooleanState(false)

  return (
    <Box marginTop={isIos && !isScreenHeightShort ? '-l2plus' : 'none'}>
      <FooterBar post={post} expandComments={expandComments} />
      <CommentBox
        comments={post.comments}
        areCommentsExpanded={areCommentsExpanded}
        toggleCommentsExpanded={toggleCommentsExpanded}
      />
    </Box>
  )
}
