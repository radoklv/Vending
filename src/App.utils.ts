const coins = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

export const calculateChange = (amount: number) => {
  const result = [];

  let remainingAmount = amount;

  for (let coin of coins) {
    while (remainingAmount >= coin) {
      result.push(coin);
      remainingAmount = parseFloat((remainingAmount - coin).toFixed(2));
    }
  }

  return result;
};
