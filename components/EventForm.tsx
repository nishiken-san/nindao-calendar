'use client'

import { useState } from 'react'
import { VStack, Input, Button } from '@chakra-ui/react'
import { Event } from '../types/index'

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void
  onCancel: () => void
}

export default function EventForm({ onSubmit, onCancel }: EventFormProps) {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, start, end })
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Input
          placeholder="イベントタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <Input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <Button type="submit" colorScheme="teal">
          保存
        </Button>
        <Button onClick={onCancel} variant="outline">
          キャンセル
        </Button>
      </VStack>
    </form>
  )
}