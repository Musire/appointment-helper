export const calculatePercentage = ( counted: number, totalCount: number): number => {
  if (totalCount === 0) return 0;

  return Math.round((counted / totalCount) * 100);
};

export function extractPercentage (requirements: Record<string, boolean>) {
    const counted = Object.values(requirements).filter(Boolean).length
    const totalCount = Object.values(requirements).length
    const percentage = calculatePercentage(counted, totalCount)

    return {
      counted,
      totalCount,
      percentage
    }
}
