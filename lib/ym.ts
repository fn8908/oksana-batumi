export function ymGoal(goal: string) {
  const id = process.env.NEXT_PUBLIC_YM_ID
  if (id && typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
    ;(window as any).ym(Number(id), 'reachGoal', goal)
  }
}
