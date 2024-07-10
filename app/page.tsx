'use client'

import { useState, useEffect } from 'react'
import { Box, VStack, Heading, Button, useDisclosure } from '@chakra-ui/react'
import Calendar from '@/components/Calendar'
import EventForm from '@/components/EventForm'
import { getEvents, addEvent } from '@/lib/firebase'
import { Event } from '@/types'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getEvents()
      setEvents(fetchedEvents)
    }
    fetchEvents()
  }, [])

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const addedEvent = await addEvent(newEvent)
      setEvents(prevEvents => [...prevEvents, addedEvent])
      onClose()
    } catch (error) {
      console.error("Failed to add event:", error)
    }
  }

  return (
    <Box maxWidth="1200px" margin="auto" padding={8}>
      <VStack spacing={8}>
        <Heading>共有スケジュール</Heading>
        <Button onClick={onOpen} colorScheme="teal">
          新しいイベントを追加
        </Button>
        <Calendar events={events} />
        <EventForm isOpen={isOpen} onClose={onClose} onSubmit={handleAddEvent} />
      </VStack>
    </Box>
  )
}