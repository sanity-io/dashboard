import React from 'react'
import {Box, Flex, rem, Stack, Text} from '@sanity/ui'
import {styled} from 'styled-components'
import {useListFormat, type User, UserAvatar} from 'sanity'
import {RobotIcon} from '@sanity/icons'

const Root = styled(Flex)`
  height: ${rem(33)}; // 33 = PREVIEW_SIZES.default.media.height
  box-sizing: content-box;
`

export interface ProjectUserProps {
  user: User
  isRobot: boolean
  roles: string[]
}

export function ProjectUser({user, isRobot, roles}: ProjectUserProps) {
  const listFormat = useListFormat({style: 'narrow'})
  return (
    <Root align="center">
      <Flex align="center" flex={1} gap={2}>
        <Box flex="none">
          {isRobot ? (
            <Text size={2}>
              <RobotIcon />
            </Text>
          ) : (
            <UserAvatar user={user} />
          )}
        </Box>

        <Stack flex={1} space={2}>
          <Text size={1} style={{color: 'inherit'}} textOverflow="ellipsis" weight="medium">
            {user.displayName}
          </Text>

          <Text muted size={1} textOverflow="ellipsis">
            {listFormat.format(roles)}
          </Text>
        </Stack>
      </Flex>
    </Root>
  )
}
