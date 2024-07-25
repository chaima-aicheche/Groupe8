import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import'../customCalendar.css';
const localizer = momentLocalizer(moment);


const events = [
  {
    id: 0,
    title: 'Interview with Company A',
    start: new Date(2024, 7, 5, 10, 0), // 5th July 2023, 10:00 AM
    end: new Date(2024, 7, 5, 11, 0),   // 5th July 2023, 11:00 AM
  },
  {
    id: 1,
    title: 'Interview with Company B',
    start: new Date(2023, 7, 6, 14, 0), 
    end: new Date(2023, 7, 6, 15, 0),  
  },
];


const Planning = () => {
  return (
    <div className="planning" style={{ height: '100vh' }}>
    <h1>Planning</h1>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100%' }}
    />
  </div>
  );
};

export default Planning;
