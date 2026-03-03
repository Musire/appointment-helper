export const calculatePercentage = ( counted: number, totalCount: number): number => {
  if (totalCount === 0) return 0;

  return Math.round((counted / totalCount) * 100);
};
