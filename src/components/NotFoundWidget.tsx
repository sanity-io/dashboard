import React, {PropsWithChildren, ReactNode} from 'react'
import {Card, Stack, Heading, Box} from '@sanity/ui'
import {styled} from 'styled-components'

const Root = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`

export type NotFoundWidgetProps = PropsWithChildren<{
  title?: ReactNode
}>

export function NotFoundWidget(props: NotFoundWidgetProps) {
  const {title, children} = props
  return (
    <Root radius={3} paddingX={3} paddingY={4} tone="critical">
      <Stack space={2}>
        {title && (
          <Heading size={1} as="h2">
            {title}
          </Heading>
        )}
        {children && <Box>{children}</Box>}
      </Stack>
    </Root>
  )
}
