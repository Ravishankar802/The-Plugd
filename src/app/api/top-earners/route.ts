import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function calculateEarningsForPromoter(username: string, i: number, elapsedToday: number, elapsedWeek: number, elapsedAllTime: number) {
  const seed = getHash(username);
  
  // Base Targets
  let targetAllTime = 500000;
  if (i === 0) {
    targetAllTime = 11000000;
  } else if (i === 1) {
    targetAllTime = 5500000;
  } else {
    targetAllTime = 500000 + (5500000 - 500000) * Math.pow((49 - i) / 48, 1.8);
  }
  const allTimeVar = (seed % 1000) - 500; // ±500
  const finalTargetAllTime = Math.max(i === 0 ? 11000000 : (i === 1 ? 5500000 : 500000), targetAllTime + allTimeVar);

  let targetThisWeek = 30000;
  if (i === 0) {
    targetThisWeek = 450000;
  } else {
    targetThisWeek = 30000 + (250000 - 30000) * Math.pow((49 - i) / 48, 1.6);
  }
  const weekVar = (seed % 200) - 100; // ±100
  const finalTargetThisWeek = Math.max(i === 0 ? 450000 : 30000, targetThisWeek + weekVar);

  let targetToday = 5000;
  if (i === 0) {
    targetToday = 40000;
  } else {
    targetToday = 5000 + (25000 - 5000) * Math.pow((49 - i) / 48, 1.4);
  }
  const todayVar = (seed % 100) - 50; // ±50
  const finalTargetToday = Math.max(i === 0 ? 40000 : 5000, targetToday + todayVar);

  // Helper to map any amount into starter, pro, max sales
  const getCommissionSum = (amount: number) => {
    let maxSales = Math.floor((amount * 0.50) / 500);
    let proSales = Math.floor((amount * 0.35) / 250);
    let starterSales = Math.floor((amount * 0.15) / 100);

    let sum = maxSales * 500 + proSales * 250 + starterSales * 100;
    let remainder = amount - sum;

    if (remainder > 0) {
      const addMax = Math.floor(remainder / 500);
      maxSales += addMax;
      remainder -= addMax * 500;
    }
    if (remainder > 0) {
      const addPro = Math.floor(remainder / 250);
      proSales += addPro;
      remainder -= addPro * 250;
    }
    if (remainder > 0) {
      const addStarter = Math.floor(remainder / 100);
      starterSales += addStarter;
      remainder -= addStarter * 100;
    }
    if (remainder === 50) {
      if (starterSales >= 2) {
        proSales += 1;
        starterSales -= 2;
      } else {
        maxSales += 1;
        proSales -= 1;
        starterSales -= 2;
      }
    }
    return { maxSales, proSales, starterSales };
  };

  const baseAllTimeSales = getCommissionSum(finalTargetAllTime);
  const baseThisWeekSales = getCommissionSum(finalTargetThisWeek);
  const baseTodaySales = getCommissionSum(finalTargetToday);

  // Conversion rates (conversions per 10,000 minutes to have high precision)
  const rankMult = 1 + 9 * Math.pow((49 - i) / 49, 1.5);
  const starterConversionsPer10k = (50 + (seed % 50)) * rankMult;
  const proConversionsPer10k = (30 + (seed % 40)) * rankMult;
  const maxConversionsPer10k = (10 + (seed % 30)) * rankMult;

  // Live drift sales (use elapsedToday for all to keep weekly and all-time aligned to their bases)
  const liveMaxToday = Math.floor((elapsedToday * maxConversionsPer10k) / 10000);
  const liveProToday = Math.floor((elapsedToday * proConversionsPer10k) / 10000);
  const liveStarterToday = Math.floor((elapsedToday * starterConversionsPer10k) / 10000);

  // Compute final sales counts
  const totalMaxToday = baseTodaySales.maxSales + liveMaxToday;
  const totalProToday = baseTodaySales.proSales + liveProToday;
  const totalStarterToday = baseTodaySales.starterSales + liveStarterToday;

  const totalMaxWeek = baseThisWeekSales.maxSales + liveMaxToday;
  const totalProWeek = baseThisWeekSales.proSales + liveProToday;
  const totalStarterWeek = baseThisWeekSales.starterSales + liveStarterToday;

  const totalMaxAllTime = baseAllTimeSales.maxSales + liveMaxToday;
  const totalProAllTime = baseAllTimeSales.proSales + liveProToday;
  const totalStarterAllTime = baseAllTimeSales.starterSales + liveStarterToday;

  return {
    today: totalMaxToday * 500 + totalProToday * 250 + totalStarterToday * 100,
    thisWeek: totalMaxWeek * 500 + totalProWeek * 250 + totalStarterWeek * 100,
    allTime: totalMaxAllTime * 500 + totalProAllTime * 250 + totalStarterAllTime * 100
  };
}

export async function GET() {
  try {
    // 1. Fetch all real promoters
    const dbPromoters = await prisma.promoter.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatarUrl: true,
        totalEarned: true,
      }
    });

    // 2. Sort real promoters by totalEarned descending
    const sortedDbPromoters = [...dbPromoters].sort((a, b) => (b.totalEarned || 0) - (a.totalEarned || 0));

    // 3. Construct a list of exactly 50 promoters
    const promotersList: any[] = [];
    const MOCK_NAMES = [
      "arjun_patel", "chiragshenoy", "sagar_khatri", "tanishakoushik", "vishalrajput",
      "sanjayprasad", "muskansoni", "ankitsharma", "rahulverma", "priyasingh",
      "adityagupta", "snehamishra", "kabirmeta", "ananyajoshi", "rohitkumar",
      "amangiri", "sourabhgupta", "shubhagarwal", "piyushgarg", "prashantbhat",
      "nisha_sharma", "vikas_yadav", "amit_choudhary", "rachel_dsouza", "karan_johari",
      "neha_kapoor", "divya_sen", "rajesh_pillai", "suresh_nair", "manoj_tiwari",
      "deepika_p", "ranveer_s", "alia_bhatt", "ranbir_k", "katrina_k",
      "vicky_kushal", "kiara_a", "sid_malhotra", "varun_dhawan", "shraddha_k",
      "siddharth_roy", "kunal_kamra", "tanmay_bhat", "zakir_khan", "abish_mathew",
      "kanan_gill", "biswa_k", "kenny_sebastian", "comic_staan", "samay_raina"
    ];

    for (let i = 0; i < 50; i++) {
      if (i < sortedDbPromoters.length) {
        const p = sortedDbPromoters[i];
        promotersList.push({
          id: p.id,
          username: p.username || p.name || p.email.split("@")[0],
          name: p.name || p.username || p.email.split("@")[0],
          email: p.email,
          avatarUrl: p.avatarUrl
        });
      } else {
        // Pad with mock data
        const mockName = MOCK_NAMES[i % MOCK_NAMES.length];
        promotersList.push({
          id: i + 1000,
          username: mockName,
          name: mockName.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          email: `${mockName}@example.com`,
          avatarUrl: null
        });
      }
    }

    // 4. Calculate deterministic, live-updating earnings for each of the 50 promoters
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Start of week = Sunday of current week
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

    const elapsedMinsToday = Math.floor((now.getTime() - startOfToday.getTime()) / 60000);
    const elapsedMinsThisWeek = Math.floor((now.getTime() - startOfWeek.getTime()) / 60000);
    const elapsedMinsAllTime = elapsedMinsThisWeek + 60 * 24 * 60; // Base: 60 days of history

    const calculatedList = promotersList.map((p, i) => {
      const { today, thisWeek, allTime } = calculateEarningsForPromoter(p.username, i, elapsedMinsToday, elapsedMinsThisWeek, elapsedMinsAllTime);
      return {
        ...p,
        todayEarnings: today,
        thisWeekEarnings: thisWeek,
        allTimeEarnings: allTime
      };
    });

    // 5. Sort each list descending and assign rank
    const sortedToday = [...calculatedList].sort((a, b) => b.todayEarnings - a.todayEarnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.todayEarnings,
      allTimeEarnings: item.allTimeEarnings, // Return actual all-time earnings so league is consistent!
      avatarUrl: item.avatarUrl
    }));

    const sortedThisWeek = [...calculatedList].sort((a, b) => b.thisWeekEarnings - a.thisWeekEarnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.thisWeekEarnings,
      allTimeEarnings: item.allTimeEarnings, // Return actual all-time earnings so league is consistent!
      avatarUrl: item.avatarUrl
    }));

    const sortedAllTime = [...calculatedList].sort((a, b) => b.allTimeEarnings - a.allTimeEarnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.allTimeEarnings,
      allTimeEarnings: item.allTimeEarnings,
      avatarUrl: item.avatarUrl
    }));

    // Backwards compatibility promoters mapping
    const compatPromoters = [...calculatedList].map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      username: item.username,
      avatarUrl: item.avatarUrl,
      totalEarned: item.allTimeEarnings
    })).sort((a, b) => b.totalEarned - a.totalEarned);

    return NextResponse.json({
      success: true,
      promoters: compatPromoters,
      today: sortedToday,
      thisWeek: sortedThisWeek,
      allTime: sortedAllTime
    });
  } catch (error) {
    console.error("Failed to fetch top earners:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
