"use client"

import Image from "next/image";
import { useState } from "react"

import Minus from "@/assets/icons/Ic_minus.svg"
import Plus from "@/assets/icons/Ic_plus.svg"

import GradeLabel from "../label/GradeLabel";

export function CardCounterInput() {
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState(2)
  const maxQuantity = 3

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 10) {
      setPrice(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="text-white">
      <div className="max-w-85.5 max-h-49 lg:max-w-110 lg:max-h-23.75">
        <div className="border-b border-gray-400">
          <div className="flex items-center mb-7.5 px-0">
            <GradeLabel grade="COMMON" size />
            <span className="mx-4 text-lg text-gray-400 font-bold sm:text-2xl">|</span>
            <h2 className="text-lg font-bold text-gray-300 sm:text-2xl">풍경</h2>
            <div className="ml-auto">
              <h2 className="text-lg font-bold underline sm:text-2xl">유디</h2>
            </div>
          </div>
        </div>

        <form className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <label className="text-lg md:text-[1.25rem] text-nowrap">총 판매 수량</label>
            <div className="w-13 sm:w-9 shrink"></div>
            <div className="flex items-center gap-3.75 flex-1">
              <div className="flex items-center justify-center rounded-[2px] border border-gray-200 px-3 py-2.5 flex-1">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  className="relative flex flex-1 justify-start w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
                >
                  <Image
                    src={Minus}
                    alt="빼기"
                  />
                </button>
                <span className="text-center text-lg sm:text-[1.25rem]">{quantity}</span>
                <button
                  type="button"
                  onClick={incrementQuantity}
                  className="relative flex flex-1 justify-end w-5.5 h-5.5 hover:bg-gray-400/50 transition-colors sm:w-6 sm:h-6"
                >
                  <Image
                    src={Plus}
                    alt="더하기"
                  />
                </button>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-nowrap text-[1.25rem]">/ {maxQuantity}</span>
                <div className="text-[12px] text-gray-200 text-nowrap font-light sm:text-[14px]">최대 {maxQuantity}장</div>
              </div>
            </div>
          </div>

          {/* Price Per Unit */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <label className="text-lg text-nowrap md:text-[1.25rem]">장당 가격</label>
              <div className="w-18 shrink"></div>
              <div className="relative w-64">
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                  className="w-full rounded-[2px] border border-gray-200 bg-transparent text-lg text-white focus:outline-none placeholder:text-sm placeholder:font-light px-5 py-2.25 sm:pr-6 sm:placeholder:text-base"
                  placeholder="숫자만 입력"
                />
                <span className="pointer-events-none absolute right-[8%] top-1/2 -translate-y-1/2 text-lg font-bold text-white sm:text-[1.25rem]">
                  P
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}    