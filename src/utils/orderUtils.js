export const getBasketAmount = (queue) =>
  Object.values(queue).reduce((sum, item) => sum + (item["quantity"] || 0), 0);

export const getBasketBottlesAmount = (queue) =>
  Object.values(queue)
    .filter(({ reusable }) => reusable === true)
    .reduce((sum, item) => sum + (item["quantity"] || 0), 0);
