import React, {PropsWithChildren} from 'react'
import {Container} from '@sanity/ui'

export function DashboardLayout(props: PropsWithChildren<{}>) {
  return (
    <Container width={4} padding={4} sizing="border" style={{minHeight: '100%'}}>
      {props.children}
    </Container>
  )
}
