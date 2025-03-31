import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid'
import { FileTextIcon } from 'lucide-react'

const features = [
    {
        Icon: FileTextIcon,
        name: 'Save your files',
        description: 'We automatically save your files as you type.',
        href: '/',
        cta: 'Learn more',
        background: <img className="absolute -top-20 -right-20 opacity-60" />,
        className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
    },
]

export function BentoDemo() {
    return (
        <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    )
}
