'use client'

import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { Event } from '../types/index'

interface CalendarProps {
  events: Event[]
}

export default function Calendar({ events }: CalendarProps) {
    const daysInMonth = 30
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
    return (
      <SimpleGrid columns={7} spacing={2} width="100%">
        {days.map(day => (
          <Box key={day} borderWidth={1} p={2} borderRadius="md">
            <Text fontWeight="bold">{day}</Text>
            {events
              .filter(event => new Date(event.start).getDate() === day)
              .map(event => (
                <Text key={event.id} fontSize="sm" color="gray.600">
                  {event.title}
                </Text>
              ))}
          </Box>
        ))}
      </SimpleGrid>
    )
  }