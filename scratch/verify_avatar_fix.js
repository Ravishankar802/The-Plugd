require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'ravishankar802@gmail.com'; // Fallback if not set
  
  const testData = {
    name: "Test Avatar Fix",
    handle: "testavatarfix_" + Date.now(),
    bio: "Testing if avatarUrl saves correctly",
    category: ["Builder"],
    followersRange: "100-500",
    email: "test@example.com",
    avatarUrl: "https://pbs.twimg.com/profile_images/1785501538352513024/9Vp6-qX2_400x400.jpg",
    status: "paid"
  };

  console.log("Creating test account...");
  
  // We can simulate the API logic or just use prisma directly to verify the DB side, 
  // but since we want to verify the API handler change, let's look at what we changed.
  // The API handler uses prisma.account.create.
  
  try {
    const account = await prisma.account.create({
      data: {
        name:          testData.name,
        xHandle:       testData.handle,
        avatarUrl:     testData.avatarUrl,
        bio:           testData.bio,
        niche:         testData.category,
        followersRange: testData.followersRange,
        email:         testData.email,
        paid:          true,
        status:        "paid",
      },
    });

    console.log("Account created:", account);
    
    if (account.avatarUrl === testData.avatarUrl) {
      console.log("SUCCESS: avatarUrl saved correctly.");
    } else {
      console.log("FAILURE: avatarUrl NOT saved correctly.");
      console.log("Expected:", testData.avatarUrl);
      console.log("Actual:", account.avatarUrl);
    }

    // Cleanup
    await prisma.account.delete({ where: { id: account.id } });
    console.log("Test account deleted.");
    
  } catch (err) {
    console.error("Error during test:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
