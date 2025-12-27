export const getFeeStatus = (feeEndDate) => {
  if (!feeEndDate) return "unclear";

  const today = new Date();
  const endDate = new Date(feeEndDate);

  return today <= endDate ? "clear" : "unclear";
};
