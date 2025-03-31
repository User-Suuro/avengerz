import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee'
import Image from 'next/image'

// Create a larger array of unique content items
const allContent = [
    {
        id: 0,
        img: '/assets/services/decors/decor_8.jpg',
    },
    {
        id: 1,
        img: '/assets/services/decors/decor_12.jpg',
    },
    {
        id: 2,
        img: '/assets/services/panaflex/seven_eleven_1.jpg',
    },
    {
        id: 3,
        img: '/assets/services/panaflex/pizza_1.jpg',
    },
    {
        id: 4,
        img: '/assets/services/sablay/sablay_3.jpg',
    },
    {
        id: 5,
        img: '/assets/services/tshirts/cnhs_2.jpg',
    },
    {
        id: 6,
        img: '/assets/services/tshirts/fac_2.jpg',
    },
    {
        id: 7,
        img: '/assets/services/tshirts/dtf_1.jpg',
    },
    {
        id: 8,
        img: '/assets/services/tshirts/dnnr_1.jpg',
    },
    {
        id: 9,
        img: '/assets/services/stickers/menu_1.jpg',
    },
    {
        id: 10,
        img: '/assets/services/stickers/sticker_9.jpg',
    },
    {
        id: 11,
        img: '/assets/services/stickers/sticker_11.jpg',
    },
]

// Assign different subsets to each column to avoid repetition
const firstColumn = allContent.slice(0, 3)
const secondColumn = allContent.slice(3, 6)
const thirdColumn = allContent.slice(6, 9)
const fourthColumn = allContent.slice(9, 12)

const ReviewCard = ({ img }: { img: string }) => {
    return (
        <figure
            className={cn(
                'relative h-full w-36 cursor-pointer overflow-hidden rounded-xl border',
                // light styles
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                // dark styles
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
            )}
        >
            <div className="flex h-full w-full items-center justify-center">
                <Image
                    className="h-auto w-full rounded-md object-cover"
                    width={128}
                    height={128}
                    alt="Decor image"
                    src={img || '/placeholder.svg'}
                    unoptimized
                />
            </div>
        </figure>
    )
}

export default function Marquee3D() {
    return (
        <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
            <div
                className="flex flex-row items-center gap-4"
                style={{
                    transform:
                        'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
                }}
            >
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstColumn.map((item) => (
                        <ReviewCard key={item.id} {...item} />
                    ))}
                </Marquee>
                <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:20s]"
                    vertical
                >
                    {secondColumn.map((item) => (
                        <ReviewCard key={item.id} {...item} />
                    ))}
                </Marquee>
                <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:20s]"
                    vertical
                >
                    {thirdColumn.map((item) => (
                        <ReviewCard key={item.id} {...item} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:20s]" vertical>
                    {fourthColumn.map((item) => (
                        <ReviewCard key={item.id} {...item} />
                    ))}
                </Marquee>
            </div>

            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}
