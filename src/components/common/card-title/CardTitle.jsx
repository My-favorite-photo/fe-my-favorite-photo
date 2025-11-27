import { Button } from "@/components/ui/button/Button"

export function CardTitle() {
  return (
    <div className="container flex justify-between border-b max-w-370 border-gray-100">
      <p className="text-white font-br text-[3.875rem] leading-[-0.86px]">마켓플레이스</p>
      <Button />
    </div>
  )
}