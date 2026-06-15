"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import { 
  Loader2, 
  Check,
  ArrowRight,
  Gift,
  Copy,
  ExternalLink,
  Lock,
  Wallet,
  TrendingUp,
  X,
  Save,
  Share2,
  Camera,
  Trash2,
  Upload,
  User
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";
import { getFieldsForCountry } from "@/lib/payoutFieldsByCountry";


import ReferralModal from "@/components/ReferralModal";



function DashboardProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [hasPromoter, setHasPromoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [promoterData, setPromoterData] = useState<any>(null);
  const [promoterSaving, setPromoterSaving] = useState(false);
  const [promoterSuccess, setPromoterSuccess] = useState(false);
  const [promoterError, setPromoterError] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState(0);
  
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [withdrawalSuccessMessage, setWithdrawalSuccessMessage] = useState<string | null>(null);
  const [requestingWithdrawal, setRequestingWithdrawal] = useState(false);
  const [useBankTransfer, setUseBankTransfer] = useState(false);
  const [usePaypal, setUsePaypal] = useState(false);

  const referralLinkSuffix = promoterData?.username || promoterData?.referralCode || "";
  const link = `https://theplugd.com?ref=${referralLinkSuffix}`;

  const POST_VARIATIONS = [
    `if you've never heard of Plugd, it's a referral platform 💸

pay ₹199 once, get your link, share it everywhere - whatsapp, telegram, discord, twitter, wherever

every person who joins through your link = ₹100 in your earnings

stay consistent and it builds up fast 👉 ${link}`,
    `Plugd is a referral program and honestly one of the simplest ways to make money online 💸

₹199 to join. you get a unique link. every signup through your link pays you ₹100 back.

share it consistently and it compounds. i'm doing it.

👉 ${link}`,
    `joined this referral platform called Plugd a while back 💸

the model is simple - pay ₹199, get your own referral link, earn ₹100 every time someone signs up through it

the more consistently you share it, the more it adds up

here's my link 👉 ${link}`
  ];

  // Determine active section from tab param
  const activeSection = ["profile", "referrals", "earnings"].includes(tab) ? tab : "profile";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setHasPromoter(data.hasPromoter);
          setIsAdmin(data.isAdmin);
          setPromoterData(data.promoterData);
          setHasPendingWithdrawal(data.hasPendingWithdrawal || false);
          if (data.promoterData) {
            setUseBankTransfer(!!data.promoterData.bankAccountNumber);
            setUsePaypal(!!data.promoterData.paypalEmail && !data.promoterData.intlAccountNumber && !data.promoterData.intlIban);
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleRequestWithdrawal = async () => {
    if (requestingWithdrawal) return;
    setRequestingWithdrawal(true);
    setWithdrawalSuccessMessage(null);

    try {
      const res = await fetch("/api/request-withdrawal", {
        method: "POST"
      });

      const data = await res.json();

      if (res.ok) {
        setHasPendingWithdrawal(true);
        setWithdrawalSuccessMessage("Request submitted. We'll process it on the next payout date.");
        // Decrease pending payout in UI locally or trigger a reload
        if (promoterData) {
          setPromoterData({
            ...promoterData,
            pendingPayout: 0
          });
        }
      } else {
        alert(data.error || "Failed to submit withdrawal request.");
      }
    } catch (err: any) {
      console.error("Withdrawal error:", err);
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setRequestingWithdrawal(false);
    }
  };

  // Earnings Chart State & Logic
  const [chartData, setChartData] = useState<{ date: string; amount: number }[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartRange, setChartRange] = useState<"7d" | "4w" | "3m">("7d");
  const [chartMode, setChartMode] = useState<"daily" | "cumulative">("daily");
  const [chartMounted, setChartMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    setChartMounted(true);
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      if (tab !== "earnings" || (!hasPromoter && !isAdmin)) return;
      
      setLoadingChart(true);
      try {
        const res = await fetch(`/api/earnings-chart?range=${chartRange}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setChartData(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch earnings chart data:", err);
      } finally {
        setLoadingChart(false);
      }
    }
    fetchChartData();
  }, [chartRange, tab, hasPromoter, isAdmin]);

  const processedChartData = (() => {
    let runningTotal = 0;
    return chartData.map(item => {
      runningTotal += item.amount;
      return {
        ...item,
        displayAmount: chartMode === "cumulative" ? runningTotal : item.amount,
        cumulativeAmount: runningTotal
      };
    });
  })();
  
  const formatYAxis = (value: number) => {
    if (value === 0) return "₹0";
    if (value >= 1e7) {
      return `₹${(value / 1e7).toFixed(1).replace(/\.0$/, "")}Cr`;
    }
    if (value >= 1e5) {
      return `₹${(value / 1e5).toFixed(1).replace(/\.0$/, "")}L`;
    }
    if (value >= 1e3) {
      return `₹${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `₹${value}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB. Please select a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 150;
        
        let width = img.width;
        let height = img.height;
        const size = Math.min(width, height);
        
        canvas.width = maxDim;
        canvas.height = maxDim;
        
        if (ctx) {
          const sx = (width - size) / 2;
          const sy = (height - size) / 2;
          ctx.drawImage(img, sx, sy, size, size, 0, 0, maxDim, maxDim);
          try {
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
            setPromoterData((prev: any) => ({
              ...prev,
              avatarUrl: compressedBase64
            }));
          } catch (err) {
            console.error("Canvas toDataURL failed:", err);
            alert("Failed to process image.");
          }
        }
      };
      img.onerror = () => {
        alert("Failed to load image file.");
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      alert("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setPromoterData((prev: any) => ({
      ...prev,
      avatarUrl: null
    }));
  };

  const handlePromoterSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoterData) {
      setPromoterError("Promoter data not loaded.");
      return;
    }

    setPromoterSaving(true);
    setPromoterSuccess(false);
    setPromoterError(null);

    try {
      let derivedMethod = promoterData.payoutMethod;
      let derivedDetails = promoterData.payoutDetails;
      if (promoterData.payoutRegion === "INDIA") {
        derivedMethod = useBankTransfer ? "Bank" : "UPI";
        derivedDetails = useBankTransfer 
          ? `${promoterData.bankAccountName || ""} | ${promoterData.bankAccountNumber || ""} | ${promoterData.bankIfsc || ""}` 
          : promoterData.upiId;
      } else if (promoterData.payoutRegion === "INTERNATIONAL") {
        derivedMethod = usePaypal ? "PayPal" : "Bank";
        if (usePaypal) {
          derivedDetails = promoterData.paypalEmail;
        } else {
          const fields = getFieldsForCountry(promoterData.intlBankCountry || "");
          derivedDetails = fields
            .map(f => promoterData[f.key] || "")
            .filter(Boolean)
            .join(" | ");
        }
      }

      const res = await fetch("/api/promoters/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: promoterData.name,
          xHandle: promoterData.xHandle,
          username: promoterData.username,
          avatarUrl: promoterData.avatarUrl,
          payoutMethod: derivedMethod,
          payoutDetails: derivedDetails,
          payoutRegion: promoterData.payoutRegion,
          upiId: promoterData.upiId,
          bankAccountName: promoterData.bankAccountName,
          bankAccountNumber: promoterData.bankAccountNumber,
          bankIfsc: promoterData.bankIfsc,
          intlAccountHolderName: promoterData.intlAccountHolderName,
          intlRoutingNumber: promoterData.intlRoutingNumber,
          intlAccountNumber: promoterData.intlAccountNumber,
          intlSortCode: promoterData.intlSortCode,
          intlIban: promoterData.intlIban,
          intlBicSwift: promoterData.intlBicSwift,
          intlBsbCode: promoterData.intlBsbCode,
          intlTransitNumber: promoterData.intlTransitNumber,
          intlInstitutionNumber: promoterData.intlInstitutionNumber,
          intlBankCountry: promoterData.intlBankCountry,
          paypalEmail: promoterData.paypalEmail
        })
      });

      if (res.ok) {
        setPromoterSuccess(true);
        setTimeout(() => setPromoterSuccess(false), 3000);
      } else {
        const data = await res.json();
        setPromoterError(data.error || "Failed to save promoter profile.");
      }
    } catch (err: any) {
      console.error("Promoter save error:", err);
      setPromoterError(err.message || "An unexpected error occurred.");
    } finally {
      setPromoterSaving(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-card rounded-lg" />
        <div className="h-4 w-64 bg-card rounded-lg" />
        <div className="h-[600px] w-full bg-card rounded-xl mt-8" />
      </div>
    );
  }


  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Section */}
      {activeSection === "profile" && (
        <>
          {/* Promoter Settings Section */}
          {(hasPromoter || isAdmin) && promoterData && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="mb-8">
                <h2 className="text-[2rem] font-[700] text-foreground leading-tight tracking-tight">Your Profile</h2>
                <p className="text-muted text-[1rem] mt-1.5 font-normal">Your referral identity and payout details.</p>
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-10 shadow-2xl">
                <form onSubmit={handlePromoterSave} className="space-y-10">
                  {/* Profile Picture Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/40">
                    <div className="relative group shrink-0">
                      {promoterData.avatarUrl ? (
                        <img 
                          src={promoterData.avatarUrl} 
                          alt="Profile Picture" 
                          className="w-24 h-24 rounded-full object-cover border border-border shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-green-300 text-white font-black text-2xl flex items-center justify-center border border-border shadow-lg">
                          {(promoterData.name || "").split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || <User className="w-8 h-8" />}
                        </div>
                      )}
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold"
                      >
                        <Camera className="w-5 h-5" />
                      </label>
                    </div>

                    <div className="flex flex-col items-center sm:items-start gap-2.5 text-center sm:text-left">
                      <span className="text-[1.1rem] font-bold text-foreground">Profile Picture</span>
                      <div className="flex items-center gap-2">
                        <label 
                          htmlFor="avatar-upload"
                          className="px-4 py-2 rounded-lg bg-accent border border-border text-foreground hover:bg-accent/80 transition-all font-bold text-xs cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload Photo
                        </label>
                        <input 
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {promoterData.avatarUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-bold text-xs flex items-center gap-1.5 active:scale-[0.98]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Full Name</label>
                      <input
                        required
                        type="text"
                        value={promoterData.name || ""}
                        onChange={(e) => setPromoterData({ ...promoterData, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Email Address</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 cursor-not-allowed">
                        {promoterData.email}
                      </div>
                      <p className="text-[0.7rem] text-muted/40 font-bold uppercase tracking-wider ml-1 mt-1">Email cannot be changed.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Username (Read-only) */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Username</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 cursor-not-allowed">
                        {promoterData.username || ""}
                      </div>
                      <p className="text-[0.7rem] text-muted/40 font-bold uppercase tracking-wider ml-1 mt-1">Username cannot be changed.</p>
                    </div>

                    {/* Member Since */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Member since</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 font-medium">
                        {new Date(promoterData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Country</label>
                    <div className="relative">
                      <select
                        value={promoterData.intlBankCountry || ""}
                        onChange={(e) => {
                          const country = e.target.value;
                          const region = country === "India" ? "INDIA" : "INTERNATIONAL";
                          setPromoterData({
                            ...promoterData,
                            intlBankCountry: country,
                            payoutRegion: region,
                            // clear fields that don't apply
                            upiId: region === "INTERNATIONAL" ? null : promoterData.upiId,
                            bankAccountName: region === "INTERNATIONAL" ? null : promoterData.bankAccountName,
                            bankAccountNumber: region === "INTERNATIONAL" ? null : promoterData.bankAccountNumber,
                            bankIfsc: region === "INTERNATIONAL" ? null : promoterData.bankIfsc,
                            intlAccountHolderName: region === "INDIA" ? null : promoterData.intlAccountHolderName,
                            intlRoutingNumber: region === "INDIA" ? null : promoterData.intlRoutingNumber,
                            intlAccountNumber: region === "INDIA" ? null : promoterData.intlAccountNumber,
                            intlSortCode: region === "INDIA" ? null : promoterData.intlSortCode,
                            intlIban: region === "INDIA" ? null : promoterData.intlIban,
                            intlBicSwift: region === "INDIA" ? null : promoterData.intlBicSwift,
                            intlBsbCode: region === "INDIA" ? null : promoterData.intlBsbCode,
                            intlTransitNumber: region === "INDIA" ? null : promoterData.intlTransitNumber,
                            intlInstitutionNumber: region === "INDIA" ? null : promoterData.intlInstitutionNumber,
                            paypalEmail: region === "INDIA" ? null : promoterData.paypalEmail,
                          });
                          setUsePaypal(false);
                        }}
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner appearance-none pr-10"
                      >
                      <option value="" disabled>Select your country</option>
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="Angola">Angola</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Benin">Benin</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Dominican Republic">Dominican Republic</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Greece">Greece</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Ivory Coast">Ivory Coast</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kosovo">Kosovo</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Libya">Libya</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Moldova">Moldova</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="North Macedonia">North Macedonia</option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palestine">Palestine</option>
                      <option value="Panama">Panama</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Romania">Romania</option>
                      <option value="Russia">Russia</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="South Africa">South Africa</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                  {/* If country has been selected */}
                  {promoterData.intlBankCountry && (
                    <>
                      {/* If region is INDIA */}
                      {promoterData.payoutRegion === "INDIA" && (
                        <div className="space-y-6">
                          {!useBankTransfer ? (
                            <div className="flex flex-col gap-3">
                              <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">UPI ID</label>
                              <input
                                required={!useBankTransfer}
                                type="text"
                                placeholder="name@upi"
                                value={promoterData.upiId || ""}
                                onChange={(e) => setPromoterData({ ...promoterData, upiId: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Account Holder Name</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="As in bank records"
                                  value={promoterData.bankAccountName || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankAccountName: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                                />
                              </div>
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Bank Account Number</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="Account number"
                                  value={promoterData.bankAccountNumber || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankAccountNumber: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                                />
                              </div>
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">IFSC Code</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="Enter IFSC code"
                                  value={promoterData.bankIfsc || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankIfsc: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                                />
                              </div>
                            </div>
                          )}

                          <p className="text-[0.75rem] text-amber-500/80 font-medium mt-1">
                            <span className="block sm:inline">Make sure your details are correct. </span>
                            <span className="block sm:inline">Incorrect details may prevent your payout.</span>
                          </p>

                          <div className="flex items-center gap-3">
                            <input
                              id="useBankTransfer"
                              type="checkbox"
                              checked={useBankTransfer}
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUseBankTransfer(val);
                                if (val) {
                                  setPromoterData({ ...promoterData, upiId: null });
                                } else {
                                  setPromoterData({
                                    ...promoterData,
                                    bankAccountName: null,
                                    bankAccountNumber: null,
                                    bankIfsc: null
                                  });
                                }
                              }}
                              className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                            />
                            <label htmlFor="useBankTransfer" className="text-sm font-bold text-muted cursor-pointer select-none">
                              Use bank transfer instead
                            </label>
                          </div>
                        </div>
                      )}

                      {/* If region is INTERNATIONAL */}
                      {promoterData.payoutRegion === "INTERNATIONAL" && (
                        <div className="space-y-6">
                          {!usePaypal ? (
                            <div className="space-y-6">
                              {getFieldsForCountry(promoterData.intlBankCountry || "").map((field) => (
                                <div key={field.key} className="flex flex-col gap-3">
                                  <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">
                                    {field.label}
                                  </label>
                                  <input
                                    required={field.required}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={promoterData[field.key] || ""}
                                    onChange={(e) => setPromoterData({ ...promoterData, [field.key]: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                                  />
                                </div>
                              ))}
                              <p className="text-[0.75rem] text-amber-500/80 font-medium mt-1">
                                <span className="block sm:inline">Make sure your details are correct. </span>
                                <span className="block sm:inline">Incorrect details may prevent your payout.</span>
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-3">
                              <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">PayPal Email</label>
                              <input
                                required={usePaypal}
                                type="email"
                                placeholder="Your PayPal email"
                                value={promoterData.paypalEmail || ""}
                                onChange={(e) => setPromoterData({ ...promoterData, paypalEmail: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <input
                              id="usePaypal"
                              type="checkbox"
                              checked={usePaypal}
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUsePaypal(val);
                                if (val) {
                                  setPromoterData({
                                    ...promoterData,
                                    intlAccountHolderName: null,
                                    intlRoutingNumber: null,
                                    intlAccountNumber: null,
                                    intlSortCode: null,
                                    intlIban: null,
                                    intlBicSwift: null,
                                    intlBsbCode: null,
                                    intlTransitNumber: null,
                                    intlInstitutionNumber: null
                                  });
                                } else {
                                  setPromoterData({ ...promoterData, paypalEmail: null });
                                }
                              }}
                              className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                            />
                            <label htmlFor="usePaypal" className="text-sm font-bold text-muted cursor-pointer select-none">
                              I don't have a bank account that accepts international wire transfers
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Referral Link */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Your Referral Link</label>
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-[#16a34a] font-mono font-bold text-[1rem] shadow-inner flex items-center overflow-x-auto whitespace-nowrap no-scrollbar md:overflow-x-visible">
                        https://theplugd.com?ref={referralLinkSuffix}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'link')}
                        className="px-8 py-4 md:py-0 rounded-xl bg-accent border border-border text-foreground font-bold hover:bg-accent/80 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] shrink-0"
                      >
                        {copied === 'link' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        {copied === 'link' ? "Copied" : "Copy Link"}
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-8 border-t border-border">
                    <button
                      type="submit"
                      disabled={promoterSaving}
                      className="w-full bg-[#16a34a] text-white font-black text-lg py-5 px-12 rounded-xl transition-all hover:bg-[#16a34a]/90 shadow-2xl active:scale-[0.99] uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {promoterSaving ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    {promoterError && (
                      <p className="text-red-500 text-center md:text-left mt-4 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <X size={20} />
                        {promoterError}
                      </p>
                    )}
                    {promoterSuccess && (
                      <p className="text-green-500 text-center md:text-left mt-4 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <Check size={20} />
                        Changes saved successfully!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {/* Referrals Section */}
      {activeSection === "referrals" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Referrals</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Share Plugd and earn ₹100 for every successful referral.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Gift className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Referral Program</h2>
              <p className="text-muted max-w-sm mb-8">Earn ₹100 from every sale by sharing Plugd with your audience. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="bg-pill border border-border rounded-[16px] p-6 md:p-10 shadow-2xl space-y-8">
              <div className="space-y-4">
                <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</label>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] font-medium flex items-center overflow-x-auto whitespace-nowrap no-scrollbar md:overflow-x-visible">
                    theplugd.com?ref={referralLinkSuffix}
                  </div>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'link')}
                    className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  >
                    {copied === 'link' ? <Check className="w-5 h-5" /> : <><Copy className="w-5 h-5" /> Copy Link</>}
                  </button>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <Share2 className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Post Ideas</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className="text-xs text-muted font-normal">
                          these are just post ideas to get you started, customize them, make it sound like you
                        </p>
                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {[1, 2, 3].map((num, idx) => (
                            <button
                              key={num}
                              onClick={() => setSelectedVariation(idx)}
                              className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                                selectedVariation === idx 
                                ? "bg-selected text-selected-foreground border border-selected" 
                                : "bg-background text-muted border border-border hover:border-muted"
                              }`}
                            >
                              VARIATION {num}
                            </button>
                          ))}
                        </div>
                        <div className="min-h-[80px] flex items-center">
                          <p className="text-sm text-muted font-medium leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                            &quot;{POST_VARIATIONS[selectedVariation]}&quot;
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(POST_VARIATIONS[selectedVariation], 'post')}
                        className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'post' ? <Check className="w-4 h-4 text-green-500" /> : "Copy Post"}
                      </button>
                    </div>

                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="text-[0.7rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</span>
                        <div className="min-h-[80px] flex items-center">
                          <p className="text-sm text-muted font-medium break-all">
                            https://theplugd.com?ref={referralLinkSuffix}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'referral')}
                        className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'referral' ? <Check className="w-4 h-4 text-green-500" /> : <><Copy className="w-4 h-4" /> Copy Link</>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <TrendingUp className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">How to hit ₹1,00,000 fast</h3>
                </div>

                <div className="bg-pill border border-border rounded-2xl p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Open your contacts. Send your link to everyone you think would actually do something with this. Don&apos;t overthink it, just send.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Drop your link in every WhatsApp and Telegram group you&apos;re in.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Go on X. Post it, reply with it, DM it to your followers. Everywhere.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Find Reddit threads and Discord servers about making money, side hustles, passive income. Drop your link there.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Post your link in your Instagram story and TikTok. 10 seconds and it works while you sleep.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">6</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Put your referral link in your Instagram bio, X bio, TikTok bio. Passive clicks every time someone visits your profile.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">7</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Find Facebook groups about making money online. Millions of people in there who haven&apos;t seen this yet.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">8</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Go to YouTube. Find videos about making money online and drop your link in the comments. Those people are already looking.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">9</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Find friends who have big followings and ask them to share your link. One post from the right person changes everything.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">10</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Don&apos;t just send once and stop. Follow up. People need to see something multiple times before they act.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Earnings Section */}
      {activeSection === "earnings" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your Earnings</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Track your earnings and request payouts.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Earnings Locked</h2>
              <p className="text-muted max-w-sm mb-8">Join the referral program to start earning rewards. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
                  <p className="text-4xl font-bold text-foreground">₹{promoterData?.totalEarned || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-[#16a34a]/20">
                  <p className="text-[#16a34a] text-[0.7rem] font-bold uppercase tracking-widest mb-2">Pending Payout</p>
                  <p className="text-4xl font-bold text-[#16a34a]">₹{promoterData?.pendingPayout || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Clicks</p>
                  <p className="text-4xl font-bold text-foreground">{promoterData?.totalClicks || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Conversions</p>
                  <p className="text-4xl font-bold text-foreground">{promoterData?.totalConversions || 0}</p>
                </div>
              </div>

              {/* Earnings Over Time Chart Card */}
              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Earnings Over Time</h3>
                    <p className="text-xs text-muted mt-1 font-medium">Track your conversion velocity and growth.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Time Range Toggle */}
                    <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
                      {(["7d", "4w", "3m"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setChartRange(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                            chartRange === r
                              ? "bg-[#22c55e] text-white shadow-md"
                              : "text-muted hover:text-foreground cursor-pointer"
                          }`}
                        >
                          {r === "7d" ? "7D" : r === "4w" ? "4W" : "3M"}
                        </button>
                      ))}
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
                      {(["daily", "cumulative"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setChartMode(m)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                            chartMode === m
                              ? "bg-[#22c55e] text-white shadow-md"
                              : "text-muted hover:text-foreground cursor-pointer"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full h-72">
                  {loadingChart ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
                    </div>
                  ) : chartMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={processedChartData}
                        margin={{ top: 10, right: isDesktop ? 30 : 10, left: -5, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          stroke="var(--muted)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                          interval={
                            (!isDesktop
                              ? (chartRange === "7d" ? 1 : "preserveEnd")
                              : (index: number) => {
                                  const total = processedChartData.length;
                                  const step = chartRange === "7d" ? 2 : chartRange === "4w" ? 2 : 5;
                                  return (total - 1 - index) % step === 0;
                                }) as any
                          }
                        />
                        <YAxis 
                          stroke="var(--muted)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatYAxis}
                          dx={-10}
                        />
                        <Tooltip
                          cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '3 3' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-pill border border-border px-3 py-2 rounded-xl shadow-xl font-['Georgia',_serif]">
                                  <p className="text-[10px] text-muted font-medium mb-0.5">{data.date}</p>
                                  <p className="text-xs font-bold text-[#22c55e]">
                                    ₹{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(payload[0].value))}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="displayAmount"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorEarning)"
                          dot={false}
                          activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: 'var(--background)' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-selected/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-selected" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Withdraw Funds</h3>
                  <p className="text-muted max-w-sm mt-2 font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is ₹5,000.</p>
                </div>
                {withdrawalSuccessMessage && (
                  <p className="text-[#16a34a] font-bold text-sm bg-[#16a34a]/10 px-6 py-3 rounded-xl border border-[#16a34a]/20">
                    {withdrawalSuccessMessage}
                  </p>
                )}
                {hasPendingWithdrawal ? (
                  <button 
                    disabled
                    className="bg-amber-600/10 text-amber-500 border border-amber-600/20 px-12 py-4 rounded-xl font-bold opacity-75 cursor-not-allowed shadow-inner"
                  >
                    Withdrawal requested
                  </button>
                ) : (
                  <button 
                    disabled={(promoterData?.pendingPayout || 0) < 5000 || requestingWithdrawal}
                    onClick={handleRequestWithdrawal}
                    className="bg-[#16a34a] hover:bg-[#16a34a]/90 text-white disabled:bg-white disabled:text-black disabled:opacity-50 disabled:grayscale px-12 py-4 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98]"
                  >
                    {(promoterData?.pendingPayout || 0) < 5000 
                      ? "Minimum ₹5,000 required" 
                      : requestingWithdrawal 
                        ? "Submitting..." 
                        : "Request Withdrawal"}
                  </button>
                )}
              </div>

              <p className="text-[0.75rem] text-muted text-center font-medium flex items-center justify-center gap-2">
                Payouts are processed twice a month.
                <a href="mailto:support@theplugd.com" className="text-[#16a34a] font-bold hover:underline inline-flex items-center gap-1">
                  Contact Support <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          )}
        </div>
      )}

      <ReferralModal 
        isOpen={isReferModalOpen} 
        onClose={() => setIsReferModalOpen(false)} 
        userEmail={promoterData?.email || ""} 
        referralCode={searchParams.get("ref") || ""}
      />
    </div>
  );
}

export default function DashboardProfileView() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-card rounded-lg" />
        <div className="h-4 w-64 bg-card rounded-lg" />
        <div className="h-[600px] w-full bg-card rounded-xl mt-8" />
      </div>
    }>
      <DashboardProfileContent />
    </Suspense>
  );
}
