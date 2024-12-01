import { useEffect, useState } from "react"

interface CircularProgressProps {
    percentage?: number
    size?: number
    strokeWidth?: number
    showPercentage?: boolean
}
const CircularOrogressComponent = ({
    percentage = 0,
    size = 150,
    strokeWidth = 16,
    showPercentage = true,
}: CircularProgressProps) => {
    const [progress, setProgress] = useState(0)

    // Animate the progress
    useEffect(() => {
        setProgress(percentage)
    }, [percentage])

    // Calculate circle properties
    const center = size / 2
    const radius = center - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference
    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className="stroke-gray-700"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    className="stroke-amber-500 transition-all duration-500 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
            {showPercentage && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-green-500 font-medium">
                        {Math.round(progress)} %
                    </span>
                </div>
            )}
        </div>
    )
}

export default CircularOrogressComponent