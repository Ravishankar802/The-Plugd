const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NEW_PROMOTERS = [
  { name: "Aryan Khanna", username: "aryankhanna", country: "India" },
  { name: "Raghav Sethi", username: "raghavsethi", country: "India" },
  { name: "Shreya Sen", username: "shreyasen", country: "India" },
  { name: "Aditya Chaudhary", username: "adityachaudhary", country: "India" },
  { name: "Karthik Gowda", username: "karthikgowda", country: "India" },
  { name: "Vineeth Shetty", username: "vineethshetty", country: "India" },
  { name: "Siddhant Mehra", username: "siddhantmehra", country: "India" },
  { name: "Ashish Jain", username: "ashishjain", country: "India" },
  { name: "Shruti Verma", username: "shrutiverma", country: "India" },
  { name: "Rakesh Yadav", username: "rakeshyadav", country: "India" },
  { name: "Pratik Sinha", username: "pratiksinha", country: "India" },
  { name: "Harshit Gupta", username: "harshitgupta", country: "India" },
  { name: "Piysh Gopal", username: "piyshgopal", country: "India" },
  { name: "Khushi Kapoor", username: "khushikapoor", country: "India" },
  { name: "Dushyant Kumar", username: "dushyantkumar", country: "India" },
  { name: "Ayush Mishra", username: "ayushmishra", country: "India" },
  { name: "Kanishka Goel", username: "kanishkagoel", country: "India" },
  { name: "Rohan Das", username: "rohandas", country: "India" },
  { name: "Sarthak Joshi", username: "sarthakjoshi", country: "India" },
  { name: "Daksh Rana", username: "dakshrana", country: "India" },
  { name: "Abhijeet Singh", username: "abhijeetsingh", country: "India" },
  { name: "Sumit Rawat", username: "sumitrawat", country: "India" },
  { name: "Pragya Pandey", username: "pragyapandey", country: "India" },
  { name: "Sneha Sharma", username: "snehasharma", country: "India" },
  { name: "Bilal Khan", username: "bilalkhan", country: "India" },
  { name: "Akash Shukla", username: "akashshukla", country: "India" },
  { name: "Pratibha Dixit", username: "pratibhadixit", country: "India" },
  { name: "Tushar Bhatia", username: "tusharbhatia", country: "India" },
  { name: "Mayur Jadhav", username: "mayurjadhav", country: "India" },
  { name: "Suraj Maurya", username: "surajmaurya", country: "India" },
  { name: "Rohit Bansal", username: "rohitbansal", country: "India" },
  { name: "Ankita Roy", username: "ankitaroy", country: "India" },
  { name: "Arun Chauhan", username: "arunchauhan", country: "India" },
  { name: "Praveen Hegde", username: "praveenhegde", country: "India" },
  { name: "Nikhil Somanna", username: "nikhilsomanna", country: "India" },
  { name: "Anuj Tripathi", username: "anujtripathi", country: "India" },
  { name: "Shubh Agarwal", username: "shubhagarwal", country: "India" },
  { name: "Satvik Patel", username: "satvikpatel", country: "India" },
  { name: "Anushka Tyagi", username: "anushkatyagi", country: "India" },
  { name: "Shalini Pai", username: "shalinipai", country: "India" },
  { name: "Soham Shah", username: "sohamshah", country: "India" },
  { name: "Prashant Bhat", username: "prashantbhat", country: "India" },
  { name: "Piyush Garg", username: "piyushgarg", country: "India" },
  { name: "Sourabh Chawla", username: "sourabhchawla", country: "India" },
  { name: "Muskan Mittal", username: "muskanmittal", country: "India" },
  { name: "Sanjay Prasad", username: "sanjayprasad", country: "India" },
  { name: "Vishal Rajput", username: "vishalrajput", country: "India" },
  { name: "Tanisha Shrivastav", username: "tanishashrivastav", country: "India" },
  { name: "Sagar Khatri", username: "sagarkhatri", country: "India" },
  { name: "Chirag Shenoy", username: "chiragshenoy", country: "India" }
];

async function main() {
  const topPromoters = await prisma.promoter.findMany({
    where: {
      totalEarned: { gt: 0 }
    },
    orderBy: {
      totalEarned: "desc"
    },
    take: 50
  });

  console.log(`Found ${topPromoters.length} top promoters in database.`);

  console.log("--- PASS 1: Assigning temporary unique values to prevent conflicts ---");
  for (let i = 0; i < topPromoters.length; i++) {
    const promoter = topPromoters[i];
    const oldEmail = promoter.email;
    const tempUsername = `temp_${promoter.id}_${Date.now()}`;
    const tempEmail = `${tempUsername}@example.com`;

    await prisma.$transaction(async (tx) => {
      // 1. Update referrals to refer to the temporary email
      await tx.referral.updateMany({
        where: { promoterEmail: oldEmail },
        data: { promoterEmail: tempEmail }
      });

      // 2. Update promoter profile
      await tx.promoter.update({
        where: { id: promoter.id },
        data: {
          username: tempUsername,
          referralCode: tempUsername,
          email: tempEmail
        }
      });
    });
  }

  console.log("--- PASS 2: Assigning final names, usernames, and regions ---");
  // Refetch the top promoters to get their updated temporary emails
  const tempPromoters = await prisma.promoter.findMany({
    where: {
      totalEarned: { gt: 0 }
    },
    orderBy: {
      totalEarned: "desc"
    },
    take: 50
  });

  for (let i = 0; i < tempPromoters.length; i++) {
    const promoter = tempPromoters[i];
    const newDetails = NEW_PROMOTERS[i];

    const oldEmail = promoter.email;
    const newEmail = `${newDetails.username}@example.com`;

    console.log(`Updating Rank ${i+1}: promoter ID ${promoter.id} -> ${newDetails.name} (@${newDetails.username}) - ${newDetails.country}`);

    await prisma.$transaction(async (tx) => {
      // 1. Update referrals to refer to the final email
      await tx.referral.updateMany({
        where: { promoterEmail: oldEmail },
        data: { promoterEmail: newEmail }
      });

      // 2. Update promoter profile
      await tx.promoter.update({
        where: { id: promoter.id },
        data: {
          name: newDetails.name,
          username: newDetails.username,
          referralCode: newDetails.username,
          email: newEmail,
          payoutRegion: "INDIA",
          intlBankCountry: null,
          upiId: `${newDetails.username}@okaxis`,
          paypalEmail: null
        }
      });
    });
  }

  console.log("Renaming live promoters complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
