function getGrowthRate(rank, daysOffset) {
  const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) + daysOffset;
  const dailyOffset = Math.sin((dayOfYear + rank * 3) * 2 * Math.PI / 10) * 1.5;
  const baseGrowthVal = 8 + ((rank * 73) % 28) + dailyOffset;
  
  const isNegative = rank > 10 && (rank % 12 === 0 || rank % 19 === 0);
  const initialGrowth = isNegative ? -baseGrowthVal / 4 : baseGrowthVal;
  return initialGrowth.toFixed(1) + "%";
}

console.log("--- Projected MoM Growth Rates for Next 4 Days ---");
console.log("Rank | Name | Today | Tomorrow | In 2 Days | In 3 Days");
console.log("-----|------|-------|----------|-----------|----------");

const promoters = [
  { rank: 1, name: "Aryan Khanna" },
  { rank: 2, name: "Raghav Sethi" },
  { rank: 3, name: "Shreya Sen" },
  { rank: 12, name: "Harshit Gupta" },
  { rank: 19, name: "Sarthak Joshi" },
  { rank: 38, name: "Satvik Patel" },
  { rank: 50, name: "Chirag Shenoy" }
];

promoters.forEach(p => {
  console.log(`${p.rank.toString().padEnd(4)} | ${p.name.padEnd(14)} | ${getGrowthRate(p.rank, 0).padEnd(5)} | ${getGrowthRate(p.rank, 1).padEnd(8)} | ${getGrowthRate(p.rank, 2).padEnd(9)} | ${getGrowthRate(p.rank, 3)}`);
});
