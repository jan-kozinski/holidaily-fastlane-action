import { AddComment, AddReaction } from 'mockApi/models/miragePostTypes'

export const API = {
  GET: {
    allUsers: '/api/users',
    user: (id: string) => `api/users/${id}`,
    getOrganization: '/api/organization',
    notifications: '/api/notifications',
    getPosts: '/api/posts',
    userRequests: '/api/requests',
    userStats: '/api/stats',
  },
  POST: {
    createTempUser: '/api/users',
    addPost: '/api/addpost',
    createDayOff: '/api/request',
    addCommentToPost: (comment: AddComment) => `/api/posts/${comment.postId}`,
  },
  PATCH: {
    markNotificationAsSeen: (id: string) => `/api/notifications/seen/${id}`,
  },
  PUT: {
    editUser: '/api/users',
    addReactionToPost: (reaction: AddReaction) => `/api/posts/${reaction.postId}`,
  },
}
