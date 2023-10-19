const fs = require('fs');

const readFile = () => {
  try {
    const data = fs.readFileSync('sample_input.txt', 'utf8');

    const lines = data.trim().split('\n');
    const numberOfJobs = parseInt(lines[1]);
    const schedules = [];

    for (let i = 3; i < lines.length; i += 3) {
      const startTime = parseInt(lines[i], 10);
      const endTime = parseInt(lines[i + 1], 10);
      const earnings = parseInt(lines[i + 2], 10);
      schedules.push([startTime, endTime, earnings]);
    }

    return { numberOfJobs, schedules };
  } catch (error) {
    console.error('Error reading the file:', error);
    return null;
  }
};

const jobsAndProfits = () => {
  const { numberOfJobs, schedules } = readFile();
  schedules.sort((a, b) => b[2] - a[2]);

  let endTime = -1,
    johnsJob = 0,
    johnsProfit = 0,
    totalProfit = 0;

  for (const schedule of schedules) {
    const [start, end, profit] = schedule;

    totalProfit += profit;

    if (start >= endTime) {
      johnsJob++;
      johnsProfit += profit;
      endTime = end;
    }
  }

  return [numberOfJobs - johnsJob, totalProfit - johnsProfit];
};
console.log(jobsAndProfits());
