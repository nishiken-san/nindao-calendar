'use client'

import { useState } from 'react'
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton,
  VStack, 
  Input, 
  Button,
  FormControl,
  FormLabel,
  Checkbox
} from '@chakra-ui/react'
import { Event } from '@/types'

interface EventFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (event: Omit<Event, 'id'>) => void
}

export default function EventForm({ isOpen, onClose, onSubmit }: EventFormProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [isAllDay, setIsAllDay] = useState(true)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let start, end
    if (isAllDay) {
      start = `${date}T00:00:00`
      end = `${date}T23:59:59`
    } else {
      start = `${date}T${startTime}:00`
      end = `${date}T${endTime}:00`
    }
    onSubmit({ title, start, end })
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDate('')
    setIsAllDay(true)
    setStartTime('')
    setEndTime('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新しいイベントを追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>イベントタイトル</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="イベントタイトル"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>日付</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <Checkbox 
                  isChecked={isAllDay} 
                  onChange={(e) => setIsAllDay(e.target.checked)}
                >
                  終日
                </Checkbox>
              </FormControl>
              {!isAllDay && (
                <>
                  <FormControl>
                    <FormLabel>開始時間</FormLabel>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>終了時間</FormLabel>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </FormControl>
                </>
              )}
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            保存
          </Button>
          <Button variant="ghost" onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}