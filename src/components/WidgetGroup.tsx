import React from 'react'
import {styled, css} from 'styled-components'
import {Box, Card, Grid, Text} from '@sanity/ui'
import {WidgetContainer} from '../containers/WidgetContainer'
import {DashboardConfig, LayoutConfig, DashboardWidget} from '../types'

const media = {
  small: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${({theme}) => theme.sanity.media[0]}px) {
      ${css(...args)}
    }
  `,
  medium: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${({theme}) => theme.sanity.media[2]}px) {
      ${css(...args)}
    }
  `,
}

const Root = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  & > div {
    overflow: hidden;
  }

  & > div[data-width='medium'] {
    ${media.small`
      grid-column: span 2;
    `}
  }

  & > div[data-width='large'] {
    ${media.small`
      grid-column: span 2;
    `}

    ${media.medium`
      grid-column: span 3;
    `}
  }

  & > div[data-width='full'] {
    ${media.small`
      grid-column: 1 / -1;
    `}
  }

  & > div[data-height='medium'] {
    ${media.small`
      grid-row: span 2;
    `}
  }

  & > div[data-height='large'] {
    ${media.small`
      grid-row: span 2;
    `}

    ${media.medium`
      grid-row: span 3;
    `}
  }

  & > div[data-height='full'] {
    ${media.medium`
      grid-row: 1 / -1;
    `}
  }
`

export interface WidgetGroupProps {
  config: Partial<DashboardConfig>
}

const NO_WIDGETS: DashboardWidget[] = []
const NO_LAYOUT: LayoutConfig = {}

export function WidgetGroup(props: WidgetGroupProps) {
  const {
    config: {layout = NO_LAYOUT, widgets = NO_WIDGETS},
  } = props
  return (
    <Root
      autoFlow="row dense"
      data-width={layout.width || 'auto'}
      data-height={layout.height || 'auto'}
      gap={4}
    >
      {widgets.length ? null : (
        <Card padding={4} shadow={1} tone="primary">
          <Text align="center">Add some widgets to populate this space.</Text>
        </Card>
      )}
      {widgets.map((widgetConfig, index) => {
        if (widgetConfig.type === '__experimental_group') {
          return <WidgetGroup key={index} config={widgetConfig} />
        }
        if (widgetConfig.component) {
          return <WidgetContainer key={index} {...widgetConfig} />
        }
        return <Box key={index}>{widgetConfig.name} is missing widget component</Box>
      })}
    </Root>
  )
}
