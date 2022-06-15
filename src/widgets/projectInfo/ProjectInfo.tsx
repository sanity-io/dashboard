import React, {useEffect, useMemo, useState} from 'react'
import {Box, Card, Stack, Heading, Grid, Label, Text, Code, Button} from '@sanity/ui'
import {useVersionedClient} from '../../versionedClient'
import {Subscription} from 'rxjs'
import {WidgetContainer} from '../../containers/WidgetContainer'
import {DashboardWidgetContainer} from '../../components/DashboardWidgetContainer'
import {DashboardWidget} from '../../types'

export interface ProjectInfoProps {
  __experimental_before?: DashboardWidget[]
  data: ProjectData[]
}

interface App {
  title: string
  rows?: App[]
  value?: string | {error: string}
}

interface ProjectData {
  title: string
  category?: string
}

function isUrl(url?: string) {
  return url && /^https?:\/\//.test(`${url}`)
}

function getGraphQlUrl(projectId: string, dataset: string) {
  return `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`
}

function getGroqUrl(projectId: string, dataset: string) {
  return `https://${projectId}.api.sanity.io/v1/groq/${dataset}`
}

function getManageUrl(projectId: string) {
  return `https://manage.sanity.io/projects/${projectId}`
}

const NO_EXPERIMENTAL: DashboardWidget[] = []
const NO_DATA: ProjectData[] = []

export function ProjectInfo(props: ProjectInfoProps) {
  const {__experimental_before = NO_EXPERIMENTAL, data = NO_DATA} = props
  const [studioHost, setStudioHost] = useState<string | {error: string} | undefined>()
  const [graphqlApi, setGraphQlApi] = useState<string | {error: string} | undefined>()
  const versionedClient = useVersionedClient()
  const {projectId = 'unknown', dataset = 'unknown'} = versionedClient.config()

  useEffect(() => {
    const subscriptions: Subscription[] = []

    subscriptions.push(
      versionedClient.observable
        .request<{studioHost: string}>({uri: `/projects/${projectId}`})
        .subscribe({
          next: (result) => {
            const {studioHost: host} = result
            setStudioHost(host ? `https://${host}.sanity.studio` : undefined)
          },
          error: (error) => {
            console.error('Error while looking for studioHost', error)
            setStudioHost({
              error: 'Something went wrong while looking up studioHost. See console.',
            })
          },
        })
    )

    // ping assumed graphql endpoint
    subscriptions.push(
      versionedClient.observable
        .request({
          method: 'HEAD',
          uri: `/graphql/${dataset}/default`,
        })
        .subscribe({
          next: () => setGraphQlApi(getGraphQlUrl(projectId, dataset)),
          error: (error) => {
            if (error.statusCode === 404) {
              setGraphQlApi(undefined)
            } else {
              console.error('Error while looking for graphqlApi', error)
              setGraphQlApi({
                error: 'Something went wrong while looking up graphqlApi. See console.',
              })
            }
          },
        })
    )

    return () => {
      subscriptions.forEach((s) => s.unsubscribe())
    }
  }, [dataset, projectId, versionedClient, setGraphQlApi, setStudioHost])

  const assembleTableRows = useMemo(() => {
    let result: App[] = [
      {
        title: 'Sanity project',
        rows: [
          {title: 'Project ID', value: projectId},
          {title: 'Dataset', value: dataset},
        ],
      },
    ]

    // Handle any apps
    const apps: App[] = [
      studioHost ? {title: 'Studio', value: studioHost} : null,
      ...data.filter((item) => item.category === 'apps'),
    ].filter((a): a is App => !!a)
    if (apps.length > 0) {
      result = result.concat([{title: 'Apps', rows: apps}])
    }

    // Handle APIs
    result = result.concat(
      [
        {
          title: 'APIs',
          rows: [
            {title: 'GROQ', value: getGroqUrl(projectId, dataset)},
            {
              title: 'GraphQL',
              value: (typeof graphqlApi === 'object' ? 'Error' : graphqlApi) ?? 'Not deployed',
            },
          ],
        },
      ],
      data.filter((item) => item.category === 'apis')
    )

    // Handle whatever else there might be
    const otherStuff: Record<string, ProjectData[]> = {}
    data.forEach((item) => {
      if (item.category && item.category !== 'apps' && item.category !== 'apis') {
        if (!otherStuff[item.category]) {
          otherStuff[item.category] = []
        }
        otherStuff[item.category].push(item)
      }
    })
    Object.keys(otherStuff).forEach((category) => {
      result.push({title: category, rows: otherStuff[category]})
    })

    return result
  }, [graphqlApi, studioHost, projectId, dataset, data])

  return (
    <>
      {__experimental_before.map((widgetConfig, idx) => (
        <WidgetContainer key={idx} {...widgetConfig} />
      ))}
      <Box height="fill" marginTop={__experimental_before?.length > 0 ? 4 : 0}>
        <DashboardWidgetContainer
          footer={
            <Button
              style={{width: '100%'}}
              paddingX={2}
              paddingY={4}
              mode="bleed"
              tone="primary"
              text="Manage project"
              as="a"
              href={getManageUrl(projectId)}
            />
          }
        >
          <Card
            paddingY={4}
            radius={2}
            role="table"
            aria-label="Project info"
            aria-describedby="project_info_table"
          >
            <Stack space={4}>
              <Box paddingX={3} as="header">
                <Heading size={1} as="h2" id="project_info_table">
                  Project info
                </Heading>
              </Box>
              {assembleTableRows.map((item) => {
                if (!item || !item.rows) {
                  return null
                }

                return (
                  <Stack key={item.title} space={3}>
                    <Card borderBottom padding={3}>
                      <Label size={0} muted role="columnheader">
                        {item.title}
                      </Label>
                    </Card>
                    <Stack space={4} paddingX={3} role="rowgroup">
                      {item.rows.map((row) => {
                        return (
                          <Grid key={row.title} columns={2} role="row">
                            <Text weight="medium" role="rowheader">
                              {row.title}
                            </Text>
                            {typeof row.value === 'object' && (
                              <Text size={1}>{row.value?.error}</Text>
                            )}
                            {typeof row.value === 'string' && (
                              <>
                                {isUrl(row.value) ? (
                                  <Text size={1} role="cell" style={{wordBreak: 'break-word'}}>
                                    <a href={row.value}>{row.value}</a>
                                  </Text>
                                ) : (
                                  <Code size={1} role="cell" style={{wordBreak: 'break-word'}}>
                                    {row.value}
                                  </Code>
                                )}
                              </>
                            )}
                          </Grid>
                        )
                      })}
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
          </Card>
        </DashboardWidgetContainer>
      </Box>
    </>
  )
}
