'use client'

import { useState, useEffect } from 'react'
import { Box, VStack, Heading, Button } from '@chakra-ui/react'
import Calendar from '../components/Calendar'
import EventForm from '../components/EventForm'
import { getEvents, addEvent } from '../lib/firebase'
import { Event } from '../types/index'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents()
      setEvents(fetchedEvents)
    }
    fetchEvents()
  }, [])

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
    const addedEvent = await addEvent(newEvent)
    setEvents([...events, addedEvent])
    setIsAddingEvent(false)
  }

  return (
    <Box maxWidth="1200px" margin="auto" padding={8}>
      <VStack spacing={8}>
        <Heading>共有スケジュール</Heading>
        <Button onClick={() => setIsAddingEvent(true)} colorScheme="teal">
          新しいイベントを追加
        </Button>
        <Calendar events={events} />
        {isAddingEvent && (
          <EventForm onSubmit={handleAddEvent} onCancel={() => setIsAddingEvent(false)} />
        )}
      </VStack>
    </Box>
  )
}