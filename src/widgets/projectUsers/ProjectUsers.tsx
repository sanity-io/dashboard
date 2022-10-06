import React, {useCallback, useEffect, useState} from 'react'
import {from} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import {Stack, Spinner, Card, Box, Text, Button} from '@sanity/ui'
import {RobotIcon} from '@sanity/icons'
import styled from 'styled-components'
import {DefaultPreview, useUserStore} from 'sanity'
import {useVersionedClient} from '../../versionedClient'
import {User} from 'sanity'
import {DashboardWidgetContainer} from '../../components/DashboardWidgetContainer'

const AvatarWrapper = styled(Card)`
  box-sizing: border-box;
  border-radius: 50%;
  border-color: transparent;
  overflow: hidden;
  width: 100%;
  height: 100%;

  & > img {
    width: 100%;
    height: auto;
  }
`

function getInviteUrl(projectId: string) {
  return `https://manage.sanity.io/projects/${projectId}/team/invite`
}

interface Member {
  id: string
  role: string
  isRobot: boolean
}

interface Project {
  id: string
  members: Member[]
}

export function ProjectUsers() {
  const [project, setProject] = useState<Project | undefined>()
  const [users, setUsers] = useState<User[] | undefined>()
  const [error, setError] = useState<Error | undefined>()

  const userStore = useUserStore()
  const versionedClient = useVersionedClient()

  const fetchData = useCallback(() => {
    const {projectId} = versionedClient.config()
    const subscription = versionedClient.observable
      .request<Project>({
        uri: `/projects/${projectId}`,
      })
      .pipe(
        switchMap((_project) =>
          from(userStore.getUsers(_project.members.map((mem) => mem.id))).pipe(
            map((_users) => ({project: _project, users: _users}))
          )
        )
      )
      .subscribe({
        next: ({users: _users, project: _project}) => {
          setProject(_project)
          setUsers(
            (Array.isArray(_users) ? _users : [_users]).sort((userA, userB) =>
              sortUsersByRobotStatus(userA, userB, _project)
            )
          )
        },
        error: (e: Error) => setError(e),
      })

    return () => subscription.unsubscribe()
  }, [userStore, versionedClient])

  useEffect(() => fetchData(), [fetchData])

  const handleRetryFetch = useCallback(() => fetchData(), [fetchData])

  const isLoading = !users || !project

  if (error) {
    return (
      <DashboardWidgetContainer header="Project users">
        <Box padding={4}>
          <Text>
            Something went wrong while fetching data. You could{' '}
            <a onClick={handleRetryFetch} title="Retry users fetch" style={{cursor: 'pointer'}}>
              retry
            </a>
            ..?
          </Text>
        </Box>
      </DashboardWidgetContainer>
    )
  }

  return (
    <DashboardWidgetContainer
      header="Project users"
      footer={
        <Button
          style={{width: '100%'}}
          paddingX={2}
          paddingY={4}
          mode="bleed"
          tone="primary"
          text="Invite members"
          as="a"
          loading={isLoading}
          href={isLoading ? undefined : getInviteUrl(project.id)}
        />
      }
    >
      {isLoading && (
        <Box paddingY={5} paddingX={2}>
          <Stack space={4}>
            <Text align="center" muted size={1}>
              <Spinner />
            </Text>
            <Text align="center" size={1} muted>
              Loading items...
            </Text>
          </Stack>
        </Box>
      )}

      {!isLoading && (
        <Stack space={3} padding={3}>
          {users?.map((user) => {
            const membership = project.members.find((member) => member.id === user.id)
            const media = membership?.isRobot ? (
              <Text size={3}>
                <RobotIcon />
              </Text>
            ) : (
              <AvatarWrapper tone="transparent">
                {user?.imageUrl && <img src={user.imageUrl} alt={user?.displayName} />}
              </AvatarWrapper>
            )
            return (
              <Box key={user.id}>
                <DefaultPreview
                  title={user.displayName}
                  subtitle={membership?.role}
                  media={media}
                />
              </Box>
            )
          })}
        </Stack>
      )}
    </DashboardWidgetContainer>
  )
}

function sortUsersByRobotStatus(userA: User, userB: User, project: Project) {
  const {members} = project
  const membershipA = members.find((member) => member.id === userA?.id)
  const membershipB = members.find((member) => member.id === userB?.id)
  if (membershipA?.isRobot) {
    return 1
  }
  if (membershipB?.isRobot) {
    return -1
  }
  return 0
}
