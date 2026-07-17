import { Monitor, Moon, Sun } from 'lucide-react'
import { useId } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from '@/hooks/use-theme'
import type { Theme } from '@/lib/theme'

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const id = useId()

  return (
    <RadioGroup
      value={theme}
      onValueChange={(value) => setTheme(value as Theme)}
      className="gap-1"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <div key={value} className="flex items-center gap-2 px-2 py-1">
          <RadioGroupItem value={value} id={`${id}-${value}`} />
          <Label
            htmlFor={`${id}-${value}`}
            className="flex flex-1 cursor-pointer items-center gap-2 font-normal text-sm"
          >
            <Icon className="size-4" />
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
