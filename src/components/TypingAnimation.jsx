export default function TypingAnimation () {
    //typing animation
    return (
        <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse "></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-150"></div>

        </div>
    )
}