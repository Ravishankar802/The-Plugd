
async function test() {
  const res = await fetch("https://the-plugd.vercel.app/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      xHandle: "@testuser_" + Math.random().toString(36).substring(7),
      avatarPath: "",
      bio: "Test Bio",
      niche: ["Founder"],
      followersRange: "1K-2K",
      email: "test@example.com"
    }),
  });
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Data:", data);
}
test();
