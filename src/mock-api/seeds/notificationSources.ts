import { Server } from 'miragejs'
import { Schema as ModelsSchema } from 'mockApi/models'

export const sourceHolidaily = {
  firstName: 'Holidaily',
  lastName: 'Holidaily',
  userColor: 'rgba(255, 197, 131, 1)',
  id: 'source-holidaily',
  photo: null,
  occupation: 'Holidaily',
}

export const sourcePeter = {
  firstName: 'Peter',
  lastName: 'Kansas',
  userColor: '#FF88DC',
  id: 'source-peter',
  photo: 'https://randomuser.me/api/portraits/men/1.jpg',
  occupation: 'Software Engineer',
}

export const sourceJune = {
  firstName: 'June',
  lastName: 'Osbourne',
  userColor: '#FD8989',
  id: 'source-june',
  photo: 'https://randomuser.me/api/portraits/women/68.jpg',
}

export const sourceTom = {
  firstName: 'Tom',
  lastName: 'Waist',
  userColor: '#91A6FF',
  id: 'source-tom',
  photo: 'https://randomuser.me/api/portraits/men/2.jpg',
}

export const notificationSources = (context: Server<ModelsSchema>) => {
  context.create('user', sourceHolidaily)
  context.create('user', sourceJune)
  context.create('user', sourcePeter)
  context.create('user', sourceTom)
}
