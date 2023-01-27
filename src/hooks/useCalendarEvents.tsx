import RNCalendarEvents from 'react-native-calendar-events';
import useRequest from './useRequest';
import {useAppContext} from '../contexts/AppContext';

export const useCalendarEvents = () => {
    const request = useRequest();
    const {state, dispatch} = useAppContext();

    const checkCalendarPermissions = async () => {
        await RNCalendarEvents.requestPermissions(false);
    };

    const refreshCalendarEvents = async () => {
        const calendarId = await getCalendarId();
        if (calendarId && state.user?.sync_calendar) {
            const response = await request.get(
                `/calendar/${calendarId}/events`,
            );
            if (response?.error) {
                return;
            }

            await syncCalendarEvents(response);
        }
    };

    const syncCalendarEvents = (calendarEvents: any) => {
        const milestones = state.milestones;
        console.log('state.calendarEvents', calendarEvents);
        if (milestones?.length > 0) {
            milestones.forEach(async (milestone: any) => {
                if (milestone?.date_time) {
                    const currentEvent = calendarEvents.find(
                        (event: any) =>
                            event.local_event_id.toString() ===
                            milestone.milestone_default_id.toString(),
                    );
                    console.log(
                        milestone.milestone_default_id + 'is exists',
                        currentEvent,
                    );
                    if (!currentEvent) {
                        await createCalendarEvent(
                            milestone?.name,
                            milestone.milestone_default_id,
                            milestone?.parsed_date_time,
                        );
                    } else {
                        console.log('d1', currentEvent?.date_time);
                        console.log('d2', milestone?.parsed_date_time);
                        if (
                            currentEvent?.date_time.toString() !==
                            milestone?.parsed_date_time.toString()
                        ) {
                            console.log(
                                'update date tine',
                                currentEvent?.date_time,
                            );
                            await updateCalendarEvent(
                                currentEvent,
                                milestone?.name,
                                milestone?.parsed_date_time,
                            );
                        }
                    }
                }
            });
        }
    };

    const createCalendarEvent = async (
        eventName: string,
        localEventId: any,
        date: any,
    ) => {
        const calendarId = await getCalendarId();
        if (calendarId) {
            const eventId = await RNCalendarEvents.saveEvent(eventName, {
                calendarId: calendarId,
                startDate: date,
                endDate: date,
            });

            const payload = {
                local_event_id: localEventId,
                event_id: eventId,
                calendar_id: calendarId,
                date_time: date,
            };

            console.log('payload', payload);
            await request.post(`/calendar/${calendarId}/events`, payload);
        }
    };

    const updateCalendarEvent = async (
        event: any,
        eventName: string,
        date: any,
    ) => {
        const calendarId = await getCalendarId();
        if (calendarId) {
            const response = await RNCalendarEvents.saveEvent(eventName, {
                id: event?.event_id,
                startDate: date,
                endDate: date,
            });

            console.log('update response', response);

            const payload = {
                date_time: date,
            };

            console.log('payload', payload);
            await request.put(
                `/calendar/${calendarId}/events/${event?.id}`,
                payload,
            );
        }
    };

    const getCalendarId = async () => {
        const calendars = await RNCalendarEvents.findCalendars();
        let activeCalendar = null;
        if (calendars?.length > 0) {
            const defaultCalendar = calendars.find(
                item => item.source === 'Default',
            );

            if (!defaultCalendar) {
                activeCalendar = calendars[0];
            } else {
                activeCalendar = defaultCalendar;
            }
        }

        return activeCalendar?.id;
    };

    return {
        checkCalendarPermissions,
        refreshCalendarEvents,
    };
};
