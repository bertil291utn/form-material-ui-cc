export const IsValidRangeDistance = ({ min, max }: { min: number, max: number }) => {
  return max - min > 0
}