const fs = require('fs');

const readFile = () => {
  try {
    const data = fs.readFileSync('sample_input.txt', 'utf8');

    const lines = data.split('\n');
    let numberOfEmployees = 0;
    const goodiesAndPrices = [];

    for (const line of lines) {
      if (line.startsWith('Goodies and Prices:')) {
        continue;
      } else if (line.startsWith('Number of employees:')) {
        numberOfEmployees = parseInt(line.split(':')[1].trim());
      } else {
        const [goodie, price] = line.split(':');
        if (goodie && price) {
          goodiesAndPrices.push([goodie.trim(), parseInt(price.trim())]);
        }
      }
    }

    return {
      employees: numberOfEmployees,
      prices: goodiesAndPrices,
    };
  } catch (error) {
    console.error('Error reading the file:', error);
    return null;
  }
};

const differenceBetweenMaxAndMin = () => {
  let { prices, employees } = readFile();
  prices = prices.sort((a, b) => a[1] - b[1]);
  let i = 0,
    len = prices.length,
    min = Number.MAX_SAFE_INTEGER,
    index = 0;
  while (i < len - employees) {
    j = i + employees - 1;
    const diff = prices[j][1] - prices[i][1];
    if (diff < min) {
      min = diff;
      index = i;
    }
    i++;
  }
  const selected = prices.slice(index, index + employees);
  const content = `The goodies selected for distribution are:\n${selected
    .map(([goodie, price]) => `${goodie}: ${price}`)
    .join(
      '\n'
    )}\nAnd the difference between the chosen goodie with the highest price and the lowest price is ${min}`;

  const filename = 'sample_output.txt';

  fs.writeFileSync(filename, content, 'utf8');

  return { message: 'Output written in file' };
};

console.log(differenceBetweenMaxAndMin());
