"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Info, BarChart3, FileText, X } from "lucide-react"

interface Question {
  id: string
  title: string
  description?: string
  subQuestions?: { id: string; label: string; options: { value: number; text: string }[] }[]
  options?: { value: number; text: string }[]
}

const questions: Question[] = [
  {
    id: "1",
    title: "請評估近兩週內失眠問題的嚴重程度",
    subQuestions: [
      {
        id: "q1a",
        label: "a. 入睡困難",
        options: [
          { value: 0, text: "完全不會（30分鐘以內）" },
          { value: 1, text: "輕度（30分鐘以上）" },
          { value: 2, text: "中度（1小時以上）" },
          { value: 3, text: "重度（2小時以上）" },
          { value: 4, text: "非常嚴重（3小時以上）" },
        ],
      },
      {
        id: "q1b",
        label: "b. 無法維持較長時間的睡眠",
        options: [
          { value: 0, text: "完全不會" },
          { value: 1, text: "甚少" },
          { value: 2, text: "有時" },
          { value: 3, text: "經常" },
          { value: 4, text: "幾乎每天" },
        ],
      },
      {
        id: "q1c",
        label: "c. 太早醒",
        options: [
          { value: 0, text: "完全不會" },
          { value: 1, text: "甚少" },
          { value: 2, text: "有時" },
          { value: 3, text: "經常" },
          { value: 4, text: "幾乎每天" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "您滿意自己最近的睡眠狀態嗎？",
    options: [
      { value: 0, text: "非常滿意" },
      { value: 1, text: "滿意" },
      { value: 2, text: "中等" },
      { value: 3, text: "不滿意" },
      { value: 4, text: "非常不滿意" },
    ],
  },
  {
    id: "3",
    title: "睡眠問題是否有干擾到您的日常生活？",
    description: "（如：工作表現、日常瑣事、專注力、記憶力、情緒等。）",
    options: [
      { value: 0, text: "完全無干擾" },
      { value: 1, text: "一點點干擾" },
      { value: 2, text: "有些干擾" },
      { value: 3, text: "很多干擾" },
      { value: 4, text: "非常多干擾" },
    ],
  },
  {
    id: "4",
    title: "他人是否有注意到您的生活品質因睡眠問題受到影響？",
    options: [
      { value: 0, text: "完全沒注意" },
      { value: 1, text: "一點點注意" },
      { value: 2, text: "有些注意" },
      { value: 3, text: "很多注意" },
      { value: 4, text: "非常注意" },
    ],
  },
  {
    id: "5",
    title: "最近的睡眠問題是否令您擔心或困擾？",
    options: [
      { value: 0, text: "完全不擔心" },
      { value: 1, text: "一點點擔心" },
      { value: 2, text: "有些擔心" },
      { value: 3, text: "很多擔心" },
      { value: 4, text: "非常擔心" },
    ],
  },
]

export default function ISIScale() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0)

  const getResult = () => {
    if (totalScore <= 7) {
      return {
        range: "0-7分",
        title: "無明顯失眠困擾",
        description: "您的睡眠狀況良好，無明顯失眠問題，建議維持規律作息即可。",
        color: "text-green-600",
        bgColor: "bg-green-50",
      }
    } else if (totalScore <= 21) {
      return {
        range: "8-21分",
        title: "有明顯失眠困擾",
        description:
          "您的失眠症狀較為明顯，已經對日常生活造成一定影響，建議調整睡眠習慣，若症狀持續可尋求社工協助。",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      }
    } else {
      return {
        range: "22-28分",
        title: "有明顯失眠傾向，建議尋求社工專業協助",
        description:
          "您的失眠症狀嚴重，已顯著影響日常生活與情緒，建議立即尋求社工或醫療專業人員的協助。",
        color: "text-red-600",
        bgColor: "bg-red-50",
      }
    }
  }

  const result = getResult()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl bg-white min-h-screen pb-24">
        <div className="p-5">
          <p className="text-right text-slate-500 text-lg mb-2">
            Produced by Ye yiu sum Lukey
          </p>

          <h1 className="text-center text-2xl font-bold text-blue-600 py-5 border-b-2 border-blue-100">
            失眠嚴重度量表（ISI）
          </h1>

          {/* Intro Card */}
          <Card className="mt-5 border-blue-100">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                本問卷為失眠篩檢問卷，總共7項問題，皆與睡眠質量有關。完成後您可以了解自己的失眠嚴重程度。
              </p>
            </CardContent>
          </Card>

          {/* Questions */}
          {questions.map((question) => (
            <Card key={question.id} className="mt-5 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                    {question.id}
                  </span>
                  <span>{question.title}</span>
                </CardTitle>
                {question.description && (
                  <p className="text-sm text-slate-500 ml-7">
                    {question.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {question.subQuestions ? (
                  question.subQuestions.map((subQ) => (
                    <div key={subQ.id} className="mb-4">
                      <p className="font-medium text-slate-700 mb-3">
                        {subQ.label}
                      </p>
                      <RadioGroup
                        value={answers[subQ.id]?.toString()}
                        onValueChange={(val) =>
                          handleAnswerChange(subQ.id, parseInt(val))
                        }
                      >
                        {subQ.options.map((option) => (
                          <Label
                            key={option.value}
                            htmlFor={`${subQ.id}-${option.value}`}
                            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors data-[state=checked]:bg-blue-50 data-[state=checked]:border-blue-500 mb-2"
                          >
                            <RadioGroupItem
                              value={option.value.toString()}
                              id={`${subQ.id}-${option.value}`}
                            />
                            <span className="text-sm text-slate-700">
                              {option.text}
                            </span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  ))
                ) : (
                  <RadioGroup
                    value={answers[`q${question.id}`]?.toString()}
                    onValueChange={(val) =>
                      handleAnswerChange(`q${question.id}`, parseInt(val))
                    }
                  >
                    {question.options?.map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`q${question.id}-${option.value}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-blue-50 transition-colors data-[state=checked]:bg-blue-50 data-[state=checked]:border-blue-500 mb-2"
                      >
                        <RadioGroupItem
                          value={option.value.toString()}
                          id={`q${question.id}-${option.value}`}
                        />
                        <span className="text-sm text-slate-700">
                          {option.text}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Fixed Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="mx-auto max-w-2xl flex items-center justify-between">
            <p className="font-bold text-blue-600">
              當前得分：<span className="text-xl">{totalScore}</span>
            </p>
            <Button
              onClick={() => setShowResult(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-full px-8"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              查看結果
            </Button>
          </div>
        </div>

        {/* Result Modal */}
        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-xl">評估結果</DialogTitle>
              <DialogDescription className="text-center">
                失眠嚴重度量表（ISI）分析報告
              </DialogDescription>
            </DialogHeader>

            <div className="bg-slate-50 rounded-xl p-6 text-center">
              <p className="text-blue-600 font-medium mb-2">您的總得分</p>
              <p className={`text-5xl font-bold ${result.color}`}>
                {totalScore}
              </p>
              <p className="text-slate-500 mt-2">{result.range}</p>
            </div>

            <div className={`${result.bgColor} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <FileText className={`h-4 w-4 ${result.color}`} />
                <span className={`font-semibold ${result.color}`}>結果解讀</span>
              </div>
              <p className={`font-medium ${result.color} mb-1`}>{result.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {result.description}
              </p>
            </div>

            <Button
              onClick={() => setShowResult(false)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              關閉
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
