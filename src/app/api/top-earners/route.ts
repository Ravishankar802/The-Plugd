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

    const todayItems = promotersList.map((p, i) => {
      const username = p.username;
      const seed = getHash(username);
      
      const baseToday = 15000 + (75000 - 15000) * Math.pow((49 - i) / 49, 1.4);
      const todayVar = 1 + ((seed % 9) - 4.5) / 100; // ±4.5%
      const finalBaseToday = Math.max(15000, baseToday * todayVar);

      const baseAllTime = 1500000 + (15000000 - 1500000) * Math.pow((49 - i) / 49, 1.8);
      const allTimeVar = 1 + ((seed % 15) - 7.5) / 100;
      const finalBaseAllTime = baseAllTime * allTimeVar;

      const finalDriftRate = Math.round((finalBaseAllTime * 0.00001) + (seed % 10) * 5);
      const earnings = Math.round((finalBaseToday + elapsedMinsToday * finalDriftRate) / 100) * 100;

      return {
        username,
        earnings,
        avatarUrl: p.avatarUrl
      };
    });

    const thisWeekItems = promotersList.map((p, i) => {
      const username = p.username;
      const seed = getHash(username);
      
      const baseThisWeek = 100000 + (800000 - 100000) * Math.pow((49 - i) / 49, 1.6);
      const weekVar = 1 + ((seed % 11) - 5.5) / 100; // ±5.5%
      const finalBaseThisWeek = Math.max(100000, baseThisWeek * weekVar);

      const baseAllTime = 1500000 + (15000000 - 1500000) * Math.pow((49 - i) / 49, 1.8);
      const allTimeVar = 1 + ((seed % 15) - 7.5) / 100;
      const finalBaseAllTime = baseAllTime * allTimeVar;

      const finalDriftRate = Math.round((finalBaseAllTime * 0.00001) + (seed % 10) * 5);
      const earnings = Math.round((finalBaseThisWeek + elapsedMinsThisWeek * finalDriftRate) / 100) * 100;

      return {
        username,
        earnings,
        avatarUrl: p.avatarUrl
      };
    });

    const allTimeItems = promotersList.map((p, i) => {
      const username = p.username;
      const seed = getHash(username);
      
      const baseAllTime = 1500000 + (15000000 - 1500000) * Math.pow((49 - i) / 49, 1.8);
      const allTimeVar = 1 + ((seed % 15) - 7.5) / 100;
      const finalBaseAllTime = baseAllTime * allTimeVar;

      const finalDriftRate = Math.round((finalBaseAllTime * 0.00001) + (seed % 10) * 5);
      const earnings = Math.round((finalBaseAllTime + elapsedMinsAllTime * finalDriftRate) / 100) * 100;

      return {
        username,
        earnings,
        avatarUrl: p.avatarUrl
      };
    });

    // 5. Sort each list descending and assign rank
    const sortedToday = [...todayItems].sort((a, b) => b.earnings - a.earnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.earnings,
      allTimeEarnings: item.earnings, // matching frontend expectations
      avatarUrl: item.avatarUrl
    }));

    const sortedThisWeek = [...thisWeekItems].sort((a, b) => b.earnings - a.earnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.earnings,
      allTimeEarnings: item.earnings,
      avatarUrl: item.avatarUrl
    }));

    const sortedAllTime = [...allTimeItems].sort((a, b) => b.earnings - a.earnings).map((item, idx) => ({
      rank: idx + 1,
      username: item.username,
      earnings: item.earnings,
      allTimeEarnings: item.earnings,
      avatarUrl: item.avatarUrl
    }));

    // Backwards compatibility promoters mapping
    const compatPromoters = promotersList.map((p, i) => {
      const username = p.username;
      const seed = getHash(username);
      const baseAllTime = 1500000 + (15000000 - 1500000) * Math.pow((49 - i) / 49, 1.8);
      const allTimeVar = 1 + ((seed % 15) - 7.5) / 100;
      const finalBaseAllTime = baseAllTime * allTimeVar;
      const finalDriftRate = Math.round((finalBaseAllTime * 0.00001) + (seed % 10) * 5);
      const earnings = Math.round((finalBaseAllTime + elapsedMinsAllTime * finalDriftRate) / 100) * 100;

      return {
        id: p.id,
        name: p.name,
        email: p.email,
        username: p.username,
        avatarUrl: p.avatarUrl,
        totalEarned: earnings
      };
    }).sort((a, b) => b.totalEarned - a.totalEarned);

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
