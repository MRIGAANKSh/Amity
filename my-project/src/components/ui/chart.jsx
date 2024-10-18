import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const ChartContainer = React.forwardRef(({ config, className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      {children}
      <style jsx>{`
        :root {
          ${Object.entries(config)
            .map(([key, value]) => `--color-${key}: ${value.color};`)
            .join("\n")}
        }
      `}</style>
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ content, ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div {...props} />
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">{label}</div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full bg-[${entry.color}]`} />
                <span>{entry.name}</span>
              </div>
              <span>{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }