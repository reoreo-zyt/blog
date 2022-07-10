import { resolveToken } from '../utils'

const users = {
  admin: {
    id: 1,
    name: 'admin',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: 'editor',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: 'guest',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    role: [],
  },
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 0,
        data: {
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
