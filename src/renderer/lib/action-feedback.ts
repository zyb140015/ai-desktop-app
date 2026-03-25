import { toast } from 'sonner'

export function showActionSuccess(message: string) {
	toast.success(message)
}

export function showActionError(message: string) {
	toast.error(message)
}

export function exportCsvFile(fileName: string, headers: string[], rows: Array<Array<string | number | boolean>>) {
	const csvContent = [headers, ...rows]
		.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
		.join('\n')

	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
