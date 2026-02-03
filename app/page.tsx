"use client"

import { useState } from "react"

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
        borderColor: "border-green-200",
      }
    } else if (totalScore <= 21) {
      return {
        range: "8-21分",
        title: "有明顯失眠困擾",
        description:
          "您的失眠症狀較為明顯，已經對日常生活造成一定影響，建議調整睡眠習慣，若症狀持續可尋求社工協助。",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      }
    } else {
      return {
        range: "22-28分",
        title: "有明顯失眠傾向，建議尋求社工專業協助",
        description:
          "您的失眠症狀嚴重，已顯著影響日常生活與情緒，建議立即尋求社工或醫療專業人員的協助。",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      }
    }
  }

  const result = getResult()

  const RadioOption = ({
    name,
    value,
    text,
    checked,
    onChange,
  }: {
    name: string
    value: number
    text: string
    checked: boolean
    onChange: () => void
  }) => (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors mb-2 ${
        checked
          ? "bg-blue-50 border-blue-500"
          : "bg-slate-50 border-slate-200 hover:bg-blue-50"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 accent-blue-600"
      />
      <span className="text-sm text-slate-700">{text}</span>
    </label>
  )

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
          <div className="mt-5 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                本問卷為失眠篩檢問卷，總共7項問題，皆與睡眠質量有關。完成後您可以了解自己的失眠嚴重程度。
              </p>
            </div>
          </div>

          {/* Questions */}
          {questions.map((question) => (
            <div key={question.id} className="mt-5 border border-blue-100 rounded-lg">
              <div className="p-4 pb-2">
                <div className="text-base font-semibold flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                    {question.id}
                  </span>
                  <span>{question.title}</span>
                </div>
                {question.description && (
                  <p className="text-sm text-slate-500 ml-7 mt-1">
                    {question.description}
                  </p>
                )}
              </div>
              <div className="p-4 pt-2">
                {question.subQuestions ? (
                  question.subQuestions.map((subQ) => (
                    <div key={subQ.id} className="mb-4">
                      <p className="font-medium text-slate-700 mb-3">
                        {subQ.label}
                      </p>
                      <div>
                        {subQ.options.map((option) => (
                          <RadioOption
                            key={option.value}
                            name={subQ.id}
                            value={option.value}
                            text={option.text}
                            checked={answers[subQ.id] === option.value}
                            onChange={() => handleAnswerChange(subQ.id, option.value)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    {question.options?.map((option) => (
                      <RadioOption
                        key={option.value}
                        name={`q${question.id}`}
                        value={option.value}
                        text={option.text}
                        checked={answers[`q${question.id}`] === option.value}
                        onChange={() => handleAnswerChange(`q${question.id}`, option.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fixed Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="mx-auto max-w-2xl flex items-center justify-between">
            <p className="font-bold text-blue-600">
              當前得分：<span className="text-xl">{totalScore}</span>
            </p>
            <button
              onClick={() => setShowResult(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-2 flex items-center gap-2 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              查看結果
            </button>
          </div>
        </div>

        {/* Result Modal */}
        {showResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowResult(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-center text-xl font-semibold mb-1">評估結果</h2>
              <p className="text-center text-slate-500 text-sm mb-4">
                失眠嚴重度量表（ISI）分析報告
              </p>

              <div className="bg-slate-50 rounded-xl p-6 text-center mb-4">
                <p className="text-blue-600 font-medium mb-2">您的總得分</p>
                <p className={`text-5xl font-bold ${result.color}`}>
                  {totalScore}
                </p>
                <p className="text-slate-500 mt-2">{result.range}</p>
              </div>

              <div className={`${result.bgColor} ${result.borderColor} border rounded-xl p-4 mb-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className={`h-4 w-4 ${result.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className={`font-semibold ${result.color}`}>結果解讀</span>
                </div>
                <p className={`font-medium ${result.color} mb-1`}>{result.title}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {result.description}
                </p>
              </div>

              <button
                onClick={() => setShowResult(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
