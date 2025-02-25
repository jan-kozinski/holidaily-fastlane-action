import { eachDayOfInterval } from 'date-fns'
import { Team, User } from 'mockApi/models/mirageTypes'
import { isWeekendOrHoliday } from 'poland-public-holidays'
import { DayOffEvent } from 'screens/calendar/components/DayEvent'
import { getISODateString, getISOMonthYearString } from './dates'
import { generateUUID } from './generateUUID'
import { getUserTeamId } from './getUserTeamId'

export const getAllSingleHolidayRequests = (allUsers: User[], teams: Team[], appUser: User) => {
  const allSingleRequests: DayOffEvent[] = []

  allUsers.forEach((user) => {
    user.requests.forEach((req) => {
      const dates = eachDayOfInterval({
        start: new Date(req.startDate),
        end: new Date(req.endDate),
      })
      dates.forEach((date) => {
        if (isWeekendOrHoliday(date)) return
        const request = {
          id: generateUUID(),
          person: `${user.firstName} ${user.lastName}`,
          personLastName: user.lastName,
          reason: req.description,
          position: user.occupation,
          color: user.userColor,
          categoryId: getUserTeamId(`${user.firstName} ${user.lastName}`, teams),
          date: getISODateString(date),
          monthYear: getISOMonthYearString(date),
          photo: user.photo,
          status: req.status,
        }
        if (request.person === `${appUser.firstName} ${appUser.lastName}`) {
          if (request.status === 'cancelled' || request.status === 'pending') return
        }
        allSingleRequests.push(request)
      })
    })
  })

  return { allSingleRequests }
}
