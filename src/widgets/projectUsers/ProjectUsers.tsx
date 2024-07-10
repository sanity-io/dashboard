import React, {useCallback, useEffect, useState} from 'react'
import {from} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import {Stack, Spinner, Box, Text, Button} from '@sanity/ui'
import {Role, useUserStore} from 'sanity'
import {useVersionedClient} from '../../versionedClient'
import {User} from 'sanity'
import {DashboardWidgetContainer} from '../../components/DashboardWidgetContainer'
import {ProjectUser} from './ProjectUser'

function getInviteUrl(projectId: string) {
  return `https://manage.sanity.io/projects/${projectId}/members`
}

interface Member {
  id: string
  roles: Role[]
  isRobot: boolean
  isCurrentUser: boolean
  createdAt: string
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
        tag: 'dashboard.project-users',
      })
      .pipe(
        switchMap((_project) =>
          from(userStore.getUsers(_project.members.map((mem) => mem.id))).pipe(
            map((_users) => ({project: _project, users: _users})),
          ),
        ),
      )
      .subscribe({
        next: ({users: _users, project: _project}) => {
          setProject(_project)
          setUsers(
            (Array.isArray(_users) ? _users : [_users]).sort((userA, userB) =>
              sortUsersByRobotStatus(userA, userB, _project),
            ),
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
          text="Manage members"
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
              Loading items…
            </Text>
          </Stack>
        </Box>
      )}

      {!isLoading && (
        <Stack space={3} padding={3}>
          {users?.map((user) => {
            const membership = project.members.find((member) => member.id === user.id)
            return (
              <ProjectUser
                key={user.id}
                user={user}
                isRobot={membership?.isRobot ?? false}
                roles={membership?.roles.map((role) => role.title) || []}
              />
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

  // On ties, sort by when the user was added
  if (membershipA?.isRobot === membershipB?.isRobot) {
    return (membershipA?.createdAt || '') > (membershipB?.createdAt || '') ? 1 : -1
  }

  // Robots go to the bottom
  return membershipA?.isRobot ? 1 : -1
}
