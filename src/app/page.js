import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold text-center py-5 text-primary">타임캡슐 멜로디</h1>
      <div className="flex justify-center items-center h-[calc(100vh-100px)] px-10">
        <div className="grid grid-cols-2 gap-4 w-[600px]">
          <Link href="/record">
            <Button className="h-40 text-lg w-full">노래 추가하기</Button>
          </Link>
          <Link href="/memory">
            <Button className="h-40 text-lg w-full">노래 모아보기</Button>
          </Link>
          <Link href="/friends">
            <Button className="h-40 text-lg w-full">나와 함께한<br /> 사람들</Button>
          </Link>
          <Link href="/ emotion">
            <Button className="h-40 text-lg w-full">감정 히스토리</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
