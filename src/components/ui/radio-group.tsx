import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (val: string) => void;
  name: string;
}>({ name: "radio-group" })

const RadioGroup = React.forwardRef<HTMLDivElement, any>(
  ({ className, value, onValueChange, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const actValue = value !== undefined ? value : internalValue;
    const actOnChange = React.useCallback((val: string) => {
      setInternalValue(val)
      onValueChange?.(val)
    }, [onValueChange])
    
    const internalName = React.useId()

    return (
      <RadioGroupContext.Provider value={{ value: actValue, onValueChange: actOnChange, name: internalName }}>
        <div className={cn("grid gap-2", className)} ref={ref} {...props} />
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLInputElement, any>(
  ({ className, value, id, ...props }, ref) => {
    const { value: groupValue, onValueChange, name } = React.useContext(RadioGroupContext)
    const checked = groupValue === value

    return (
      <input
        type="radio"
        id={id}
        name={name}
        ref={ref}
        value={value}
        checked={checked}
        onChange={() => onValueChange?.(value)}
        className={cn(
          "w-[14px] h-[14px] shrink-0 cursor-pointer accent-[#10B981] disabled:cursor-not-allowed disabled:opacity-50 m-0",
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
