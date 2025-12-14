export function estimateItemTableHeight({
  rowCount,
  rowHeight = 36,
  headerHeight = 40,
  titleHeight = 32,
  padding = 16,
  maxHeight = 360,
}) {
  const raw = headerHeight + titleHeight + rowCount * rowHeight + padding;

  return Math.min(raw, maxHeight);
}
