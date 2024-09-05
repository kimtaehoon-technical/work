/**
 * date内容を調整
 * "2024-07-07T22:58:17.132891+09:00 => 07月07日
 */
const format_date = (created_at: string) => {

  const date = new Date(created_at)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

interface log_read_data {
  log_id: string
  created_at: string
  user_query: string
}

interface grouped_log {
  header: string
  items: any[]
}

const group_logs_by_date = (logs: log_read_data[]) => {

  const grouped_logs: { [key: string]: any[] } = {}

  logs.forEach(log => {
    const date = log.created_at
    if (!grouped_logs[date]) {
      grouped_logs[date] = []
    }
    grouped_logs[date].push(log)
  })

  const result: grouped_log[] = Object.keys(grouped_logs).map(date => ({
    header: date,
    items: grouped_logs[date]
  }))

  return result
}

export { format_date, group_logs_by_date, grouped_log }