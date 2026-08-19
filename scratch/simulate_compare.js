const totalEarned = 106394;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function runSim(promoterId, rank) {
  const factor = Math.max(0, (50 - rank) / 48);
  let dailyRate = rank === 1 ? 1200 : 300 + 600 * Math.pow(factor, 2);
  const seededDaysActive = 45 + ((promoterId * 17) % 45);
  const virtualDays = totalEarned > 1000 && dailyRate > 0 ? Math.max(seededDaysActive, totalEarned / dailyRate) : 0;
  const roundedDaysActive = Math.max(1, Math.floor(virtualDays));

  const signupDate = new Date("2026-06-13T11:19:59.796Z");
  const virtualSignupDate = new Date(signupDate);
  virtualSignupDate.setDate(virtualSignupDate.getDate() - roundedDaysActive);

  let fixedSumRaw = 0;
  for (let d = 0; d < roundedDaysActive; d++) {
    const trend = 0.35 + 0.65 * (d / Math.max(1, roundedDaysActive - 1));
    const weeklyPhase = (promoterId * 3) % 7;
    const weekly = 0.8 + 0.4 * Math.sin((2 * Math.PI * (d + weeklyPhase)) / 7);
    const noiseSeed = (promoterId * 103 + d * 53) % 100;
    const noise = 0.3 + 1.4 * (noiseSeed / 100);
    let spike = 1.0;
    if ((promoterId * 7 + d * 31) % 19 === 0) {
      spike = 2.0 + ((promoterId * 13 + d * 7) % 5) * 0.5;
    }
    fixedSumRaw += trend * weekly * noise * spike;
  }
  const scaleFactor = totalEarned / (fixedSumRaw || 1);

  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(signupDate);
    d.setDate(d.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dates.push(`${yyyy}-${mm}-${dd}`);
  }

  console.log(`--- Simulation for Promoter ID ${promoterId} (Rank ${rank}) ---`);
  dates.forEach(dateStr => {
    const [yyyy, mm, dd] = dateStr.split("-");
    const monthLabel = months[parseInt(mm, 10) - 1];
    const dayLabel = parseInt(dd, 10);
    
    const currentDate = new Date(dateStr);
    currentDate.setHours(0, 0, 0, 0);
    const virtualSignup = new Date(virtualSignupDate);
    virtualSignup.setHours(0, 0, 0, 0);
    
    const diffTime = currentDate.getTime() - virtualSignup.getTime();
    const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let amount = 0;
    if (d >= 0) {
      const trend = 0.35 + 0.65 * Math.min(1.0, d / Math.max(1, roundedDaysActive - 1));
      const weeklyPhase = (promoterId * 3) % 7;
      const weekly = 0.8 + 0.4 * Math.sin((2 * Math.PI * (d + weeklyPhase)) / 7);
      const noiseSeed = (promoterId * 103 + d * 53) % 100;
      const noise = 0.3 + 1.4 * (noiseSeed / 100);
      let spike = 1.0;
      if ((promoterId * 7 + d * 31) % 19 === 0) {
        spike = 2.0 + ((promoterId * 13 + d * 7) % 5) * 0.5;
      }
      const raw = trend * weekly * noise * spike;
      amount = raw * scaleFactor;
    }
    console.log(`${monthLabel} ${dayLabel}: $${Math.round(amount)}`);
  });
}

runSim(1, 1);
runSim(362, 1);
