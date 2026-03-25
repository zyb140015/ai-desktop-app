import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CrudDialog } from './crud-dialog'
import { showActionError } from '../lib/action-feedback'

type Field = {
  key: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

type EntityFormDialogProps = {
  open: boolean
  title: string
  fields: Field[]
  onClose: () => void
  onSubmit: () => void
  validate?: () => string | null
}

export function EntityFormDialog({ open, title, fields, onClose, onSubmit, validate }: EntityFormDialogProps) {
  const handleSubmit = () => {
    const errorMessage = validate?.() ?? null
    if (errorMessage) {
      showActionError(errorMessage)
      return
    }
    onSubmit()
  }

  return (
    <CrudDialog
      open={open}
      title={title}
      onClose={onClose}
      footer={(
        <>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSubmit}>保存</Button>
        </>
      )}
    >
      <div className="grid gap-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label>{field.label}</Label>
            <Input value={field.value} onChange={(event) => field.onChange(event.target.value)} placeholder={field.placeholder} />
          </div>
        ))}
      </div>
    </CrudDialog>
  )
}
