"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (val: string) => void;
  labelMap: Record<string, string>;
  registerLabel: (val: string, label: string) => void;
}>({ labelMap: {}, registerLabel: () => {} })

const Select = ({ value, defaultValue, onValueChange, children, ...props }: any) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [labelMap, setLabelMap] = React.useState<Record<string, string>>({})
  
  const actualValue = value !== undefined ? value : internalValue;
  const actualOnChange = React.useCallback((val: string) => {
    setInternalValue(val)
    onValueChange?.(val)
  }, [onValueChange])

  const registerLabel = React.useCallback((val: string, label: string) => {
    setLabelMap(prev => {
      if (prev[val] !== label) return { ...prev, [val]: label }
      return prev;
    })
  }, [])

  return (
    <SelectContext.Provider value={{ value: actualValue, onValueChange: actualOnChange, labelMap, registerLabel }}>
      <div className="relative inline-flex w-full min-w-0" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectGroup = React.forwardRef<HTMLOptGroupElement, any>(({ className, ...props }, ref) => (
  <optgroup ref={ref} className={className} {...props} />
))
SelectGroup.displayName = "SelectGroup"

const SelectValue = React.forwardRef<HTMLSpanElement, any>(({ className, placeholder, ...props }, ref) => {
  const { value, labelMap } = React.useContext(SelectContext)
  const display = value && labelMap[value] ? labelMap[value] : (value || placeholder)
  return (
    <span 
      ref={ref} 
      data-slot="select-value"
      className={cn("flex flex-1 items-center gap-1.5 truncate text-left pointer-events-none", !value && "text-muted-foreground", className)} 
      {...props}
    >
      {display}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectTrigger = React.forwardRef<HTMLDivElement, any>(({ className, size = "default", children, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="select-trigger"
    data-size={size}
    className={cn(
      "flex w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm text-foreground whitespace-nowrap transition-colors outline-none select-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:data-[placeholder]:text-slate-500 dark:hover:bg-slate-800 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground opacity-50 shrink-0" />
  </div>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<HTMLSelectElement, any>(({ 
  className, children, side, sideOffset, align, alignOffset, alignItemWithTrigger, ...props 
}, ref) => {
  const { value, onValueChange } = React.useContext(SelectContext)
  return (
    <select
      ref={ref}
      data-slot="select-content"
      className={cn(
        "absolute inset-0 w-full h-full cursor-pointer appearance-none bg-transparent opacity-0 outline-none z-10",
        className
      )}
      value={value || ''}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    >
      {/* Fallback empty option so uncontrolled placeholder syncs up correctly initially */}
      <option value="" disabled hidden></option> 
      {children}
    </select>
  )
})
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<HTMLOptionElement, any>(({ className, children, ...props }, ref) => (
  <option ref={ref} disabled className={cn("px-1.5 py-1 text-xs text-muted-foreground font-semibold", className)} {...props}>
    {children}
  </option>
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<HTMLOptionElement, any>(({ className, value, children, ...props }, ref) => {
  const { registerLabel } = React.useContext(SelectContext)
  
  React.useLayoutEffect(() => {
    if (typeof children === 'string' || typeof children === 'number') {
      registerLabel(value, String(children))
    }
  }, [value, children, registerLabel])

  return (
    <option ref={ref} value={value} className={className} {...props}>
      {children}
    </option>
  )
})
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<HTMLHRElement, any>(({ className, ...props }, ref) => (
  <hr ref={ref} className={cn("hidden", className)} {...props} />
))
SelectSeparator.displayName = "SelectSeparator"

const SelectScrollUpButton = () => null
const SelectScrollDownButton = () => null

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
