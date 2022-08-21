import { post } from '../../common/request'
import { set } from '.'
import type { SubscriptionStatusSetObject } from './types'

jest.mock('../../common/request')
const mockedPost = jest.mocked(post)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('/subscription/status/set', () => {
  const apiUrl = 'https://rest.iad-01.braze.com'
  const apiKey = 'apiKey'
  const data = {}

  it('calls request for email with url and body', async () => {
    mockedPost.mockResolvedValueOnce(data)
    const body: SubscriptionStatusSetObject = {
      subscription_group_id: 'subscription_group_identifier',
      subscription_state: 'unsubscribed',
      external_id: ['external_identifier'],
      email: ['example1@email.com', 'example2@email.com'],
    }
    expect(await set(apiUrl, apiKey, body)).toBe(data)
    expect(mockedPost).toBeCalledWith(`${apiUrl}/subscription/status/set`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
    expect(mockedPost).toBeCalledTimes(1)
  })

  it('calls request for SMS with url and body', async () => {
    mockedPost.mockResolvedValueOnce(data)
    const body: SubscriptionStatusSetObject = {
      subscription_group_id: 'subscription_group_identifier',
      subscription_state: 'subscribed',
      external_id: ['external_identifier'],
      phone: ['+12223334444', '+11112223333'],
    }
    expect(await set(apiUrl, apiKey, body)).toBe(data)
    expect(mockedPost).toBeCalledWith(`${apiUrl}/subscription/status/set`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
    expect(mockedPost).toBeCalledTimes(1)
  })
})
