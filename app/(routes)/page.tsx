import Image from 'next/image'
import Marquee3D from '../_components/sections/marquee'
import { Button } from '@/components/shadcn/button'
import { ChevronRight } from 'lucide-react'

export default function Main() {
    return (
        // layout stuff
        <div>
            <div className="h-auto">
                <div className="container mx-auto flex">
                    <div className="relative flex-1 items-center justify-center">
                        <div className="absolute top-20">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-4xl leading-[1.5] font-bold tracking-tight">
                                    We are here to fulfill your Artistic Needs
                                </h1>
                                <Button className="w-fit cursor-pointer px-4">
                                    See More
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Marquee3D />
                    </div>
                </div>
            </div>
            <div>
                <Image
                    src="/assets/branding/bg.jpg"
                    alt="Background"
                    width={1920}
                    height={720}
                    className="brightness-50"
                />
            </div>
        </div>
    )
}
