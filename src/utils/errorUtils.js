export const SOFT_CODES = ["SEQUENTIAL_INVOICE", "SOFT_COUNTERPARTY_CONFLICT"];

export function analyzeBackendErrors(errors) {
  const hasHardErrors = errors.some((e) => !SOFT_CODES.includes(e.code));
  const onlySoftErrors = !hasHardErrors;

  return { hasHardErrors, onlySoftErrors };
}
