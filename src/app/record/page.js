"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, ImageIcon, PlusCircleIcon, XCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  dob: z.date({
    required_error: "날짜를 선택해주세요.",
  }),
  image: z.any().refine((files) => files?.length > 0, "사진을 업로드해주세요."),
  memory: z.string().min(1, "추억을 입력해주세요."),
  people: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  musicLink: z.string().optional(),
})

export default function DatePickerForm() {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState("")
  const [keywords, setKeywords] = useState([])
  const [newKeyword, setNewKeyword] = useState("")

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      people: [],
      keywords: [],
      memory: "",
      musicLink: "",
    },
  })

  const getInformation = async () => {
    const response = await fetch('https://kubook-exp.shop/information/@me')
    const data = await response.json()
    console.log('hi')
    console.log(data)
    setPeople(data.people)
    setKeywords(data.keywords)
  }

  async function onSubmit(data) {
    try {
      // FormData 객체 생성
      const formData = new FormData()
      formData.append('dob', data.dob.toISOString())
      formData.append('memory', data.memory)
      formData.append('image', data.image[0])
      formData.append('musicLink', data.musicLink)
      people.forEach((person, index) => {
        formData.append(`people[${index}]`, person)
      })
      keywords.forEach((keyword, index) => {
        formData.append(`keywords[${index}]`, keyword)
      })

      // API 요청
      const response = await fetch('/api/memories', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('서버 에러가 발생했습니다.')
      }

      const result = await response.json()
      
      toast({
        title: "저장되었습니다",
        description: "추억이 성공적으로 저장되었습니다.",
      })
    } catch (error) {
      toast({
        title: "에러가 발생했습니다",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleAddPerson = () => {
    if (newPerson.trim()) {
      setPeople([...people, newPerson.trim()])
      setNewPerson("")
    }
  }

  const handleRemovePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index))
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()])
      setNewKeyword("")
    }
  }

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold text-center pt-5 text-primary">타임캡슐 멜로디</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 max-w-[500px] mx-auto">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>추억 날짜</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>날짜 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="memory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>나의 추억</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="추억을 입력하세요" 
                    className="min-h-[120px] resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>키워드</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map((keyword, index) => (
                <div key={index} className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                  <span>{keyword}</span>
                  <XCircleIcon
                    className="h-4 w-4 cursor-pointer hover:text-destructive"
                    onClick={() => handleRemoveKeyword(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="키워드를 입력하세요"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddKeyword()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddKeyword}
                className="w-full sm:w-24"
              >
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                추가
              </Button>
            </div>
          </FormItem>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>추억 사진</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files)}
                    className="h-15 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-foreground hover:file:bg-secondary/80"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="musicLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>음악</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="음악 링크를 입력하세요"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>함께한 사람들</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {people.map((person, index) => (
                <div key={index} className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                  <span>{person}</span>
                  <XCircleIcon
                    className="h-4 w-4 cursor-pointer hover:text-destructive"
                    onClick={() => handleRemovePerson(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                placeholder="이름을 입력하세요"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddPerson()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPerson}
                className="w-full sm:w-24"
              >
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                추가
              </Button>
            </div>
          </FormItem>
          <Button type="submit" className="w-full">추억 저장하기</Button>
        </form>
      </Form>
    </div>
  )
}
