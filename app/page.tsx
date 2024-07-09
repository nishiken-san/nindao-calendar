'use client';

import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { db } from '../lib/firebase';
import Calendar from '../components/Calendar';
import EventForm from '../components/EventForm';
import { Event } from '../types';

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsRef = ref(db, 'events');
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedEvents: Event[] = [];
      for (const key in data) {
        loadedEvents.push({
          id: key,
          ...data[key],
          start: new Date(data[key].start),
          end: new Date(data[key].end),
        });
      }
      setEvents(loadedEvents);
    });

    return () => unsubscribe();
  }, []);

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    console.log('Adding new event:', newEvent);
    const eventsRef = ref(db, 'events');
    push(eventsRef, newEvent);
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventRef = ref(db, `events/${eventId}`);
    remove(eventRef);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">にんだおカレンダー</h1>
      <EventForm onSubmit={handleAddEvent} />
      <Calendar 
        events={events} 
        onSelectEvent={(event) => {
          if (window.confirm(`${event.title}を削除しますか？`)) {
            handleDeleteEvent(event.id);
          }
        }}
      />
    </div>
  );
}