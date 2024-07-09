'use client';

import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '../types';

moment.locale('ja');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onSelectEvent }) => {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={onSelectEvent}
    />
  );
};

export default Calendar;