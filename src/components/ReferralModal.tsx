"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Link as LinkIcon, IndianRupee, Infinity, Gift, Sparkles, Loader2, Mail, ChevronDown, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { getFieldsForCountry } from "@/lib/payoutFieldsByCountry";
import { COUNTRY_CODES } from "@/lib/countryCodes";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  referralCode?: string;
}

export default function ReferralModal({ isOpen, onClose, userEmail, referralCode = "" }: ReferralModalProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
    payoutMethod: "PayPal" as "PayPal" | "UPI",
    payoutDetails: "",
    payoutRegion: "INDIA" as "INDIA" | "INTERNATIONAL",
    upiId: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankIfsc: "",
    intlAccountHolderName: "",
    intlRoutingNumber: "",
    intlAccountNumber: "",
    intlSortCode: "",
    intlIban: "",
    intlBicSwift: "",
    intlBsbCode: "",
    intlTransitNumber: "",
    intlInstitutionNumber: "",
    intlBankCountry: "",
    paypalEmail: ""
  });

  const [useBankTransfer, setUseBankTransfer] = useState(false);
  const [usePaypal, setUsePaypal] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phoneNo, setPhoneNo] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [phoneCodeDropdownOpen, setPhoneCodeDropdownOpen] = useState(false);

  const isPayoutInfoFilled = () => {
    if (formData.payoutRegion === "INDIA") {
      if (useBankTransfer) {
        return !!formData.bankAccountName.trim() && !!formData.bankAccountNumber.trim() && !!formData.bankIfsc.trim();
      } else {
        return !!formData.upiId.trim();
      }
    } else {
      if (usePaypal) {
        return !!formData.paypalEmail.trim();
      } else {
        return !!formData.intlAccountNumber.trim() || !!formData.intlIban.trim();
      }
    }
  };

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [usernameMessage, setUsernameMessage] = useState("");

  useEffect(() => {
    if (!username) {
      setUsernameStatus('idle');
      setUsernameMessage("");
      return;
    }

    const trimmed = username.trim();

    if (!/^[a-zA-Z0-9_.]+$/.test(trimmed)) {
      setUsernameStatus('invalid');
      setUsernameMessage("Only letters, numbers, _ and . allowed");
      return;
    }
    if (trimmed.length < 3) {
      setUsernameStatus('invalid');
      setUsernameMessage("Username must be at least 3 characters");
      return;
    }
    if (trimmed.length > 20) {
      setUsernameStatus('invalid');
      setUsernameMessage("Username must be 20 characters or less");
      return;
    }
    if (trimmed.startsWith(".") || trimmed.endsWith(".")) {
      setUsernameStatus('invalid');
      setUsernameMessage("Username can't start or end with a period");
      return;
    }
    if (trimmed.includes("..")) {
      setUsernameStatus('invalid');
      setUsernameMessage("Username can't contain consecutive periods (..)");
      return;
    }

    setUsernameStatus('checking');
    setUsernameMessage("");

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        
        if (res.status === 400 && data.error === "invalid format") {
          setUsernameStatus('invalid');
          setUsernameMessage(data.reason);
        } else if (data.available === true) {
          setUsernameStatus('available');
          setUsernameMessage("Username available");
        } else {
          setUsernameStatus('taken');
          setUsernameMessage("Username is taken");
        }
      } catch (err) {
        console.error("Check username fetch error:", err);
        setUsernameStatus('invalid');
        setUsernameMessage("Failed to verify username availability");
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  useEffect(() => {
    setMounted(true);
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  if (!isOpen) return null;

  // Use resolvedTheme to handle 'system' preference
  const currentTheme = mounted ? resolvedTheme : 'dark';
  const isDark = currentTheme === 'dark';

  const handleJoin = async () => {
    // Admin Bypass Check
    const adminEmail = "ravx003@gmail.com";
    if (userEmail === adminEmail) {
      setLoading(true);
      try {
        const res = await fetch("/api/referral/join-admin", { method: "POST" });
        if (res.ok) {
          window.location.reload();
          return;
        }
      } catch (err) {
        console.error("Admin bypass failed:", err);
      }
      setLoading(false);
    }

    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !isPayoutInfoFilled() || !username.trim() || !phoneNo.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (usernameStatus !== 'available') {
      alert("Please choose an available username first.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setLoading(true);

    let derivedMethod: string = formData.payoutMethod;
    let derivedDetails = formData.payoutDetails;
    if (formData.payoutRegion === "INDIA") {
      derivedMethod = useBankTransfer ? "Bank" : "UPI";
      derivedDetails = useBankTransfer 
        ? `${formData.bankAccountName.trim()} | ${formData.bankAccountNumber.trim()} | ${formData.bankIfsc.trim()}` 
        : formData.upiId.trim();
    } else {
      derivedMethod = usePaypal ? "PayPal" : "Bank";
      if (usePaypal) {
        derivedDetails = formData.paypalEmail.trim();
      } else {
        const fields = getFieldsForCountry(formData.intlBankCountry || "");
        derivedDetails = fields
          .map(f => formData[f.key]?.trim() || "")
          .filter(Boolean)
          .join(" | ");
      }
    }

    const redirectUrl = 'https://theplugd.com/vault';
    const baseUrl = `https://checkout.dodopayments.com/buy/${process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID}`;
    
    let finalReferralCode = referralCode;
    if (!finalReferralCode && typeof document !== "undefined") {
      const cookies = document.cookie.split("; ");
      const match = cookies.find(row => row.startsWith("plugd_ref="));
      if (match) {
        finalReferralCode = match.split("=")[1] || "";
      }
    }

    const rawParams: Record<string, string | undefined> = {
      quantity: '1',
      redirect_url: redirectUrl,
      email: formData.email,
      showDiscounts: 'false',
      metadata_type: 'promoter',
      metadata_name: formData.name,
      metadata_email: formData.email,
      metadata_username: username.trim(),
      metadata_phoneNumber: `${phoneCode}${phoneNo.trim()}`,
      metadata_payoutMethod: derivedMethod,
      metadata_payoutDetails: derivedDetails,
      metadata_payoutRegion: formData.payoutRegion,
    };

    if (derivedMethod === "UPI") {
      rawParams.metadata_upiId = formData.upiId;
    } else if (derivedMethod === "PayPal") {
      rawParams.metadata_paypalEmail = formData.paypalEmail;
    } else if (derivedMethod === "Bank") {
      if (formData.payoutRegion === "INDIA") {
        rawParams.metadata_bankAccountName = formData.bankAccountName;
        rawParams.metadata_bankAccountNumber = formData.bankAccountNumber;
        rawParams.metadata_bankIfsc = formData.bankIfsc;
      } else {
        rawParams.metadata_intlAccountHolderName = formData.intlAccountHolderName;
        rawParams.metadata_intlRoutingNumber = formData.intlRoutingNumber;
        rawParams.metadata_intlAccountNumber = formData.intlAccountNumber;
        rawParams.metadata_intlSortCode = formData.intlSortCode;
        rawParams.metadata_intlIban = formData.intlIban;
        rawParams.metadata_intlBicSwift = formData.intlBicSwift;
        rawParams.metadata_intlBsbCode = formData.intlBsbCode;
        rawParams.metadata_intlTransitNumber = formData.intlTransitNumber;
        rawParams.metadata_intlInstitutionNumber = formData.intlInstitutionNumber;
        rawParams.metadata_intlBankCountry = formData.intlBankCountry;
      }
    }

    if (finalReferralCode) {
      rawParams.metadata_referralCode = finalReferralCode;
    }

    const COUNTRY_TO_ISO: Record<string, string> = {
      "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Angola": "ao", "Argentina": "ar", "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az",
      "Bahrain": "bh", "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Benin": "bj", "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw",
      "Brazil": "br", "Bulgaria": "bg", "Burkina Faso": "bf", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Chile": "cl", "China": "cn", "Colombia": "co",
      "Costa Rica": "cr", "Croatia": "hr", "Cyprus": "cy", "Czech Republic": "cz", "Denmark": "dk", "Dominican Republic": "do", "Ecuador": "ec", "Egypt": "eg",
      "El Salvador": "sv", "Estonia": "ee", "Ethiopia": "et", "Finland": "fi", "France": "fr", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Greece": "gr",
      "Guatemala": "gt", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iraq": "iq", "Ireland": "ie",
      "Israel": "il", "Italy": "it", "Ivory Coast": "ci", "Jamaica": "jm", "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kosovo": "xk",
      "Kuwait": "kw", "Kyrgyzstan": "kg", "Latvia": "lv", "Lebanon": "lb", "Libya": "ly", "Lithuania": "lt", "Luxembourg": "lu", "Malaysia": "my", "Mali": "ml",
      "Malta": "mt", "Mexico": "mx", "Moldova": "md", "Mongolia": "mn", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nepal": "np",
      "Netherlands": "nl", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "North Macedonia": "mk", "Norway": "no", "Oman": "om",
      "Pakistan": "pk", "Palestine": "ps", "Panama": "pa", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt", "Qatar": "qa",
      "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Sierra Leone": "sl", "Singapore": "sg",
      "Slovakia": "sk", "Slovenia": "si", "South Africa": "za", "South Korea": "kr", "Spain": "es", "Sri Lanka": "lk", "Sweden": "se", "Switzerland": "ch",
      "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Uganda": "ug",
      "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "Uruguay": "uy", "Uzbekistan": "uz",
      "Venezuela": "ve", "Vietnam": "vn", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw"
    };

    let derivedCountry: string | undefined = undefined;
    if (formData.payoutRegion === "INDIA") {
      derivedCountry = "IN";
    } else if (formData.intlBankCountry) {
      derivedCountry = COUNTRY_TO_ISO[formData.intlBankCountry]?.toUpperCase();
    }

    const filteredParams: Record<string, string> = {};
    Object.entries(rawParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        filteredParams[key] = val;
      }
    });

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          metadata: filteredParams,
          country: derivedCountry,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create checkout session");
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error("Checkout session error:", err);
      alert(`Checkout failed: ${err.message || "Please try again."}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      <style>{`
        .georgia-modal,
        .georgia-modal input,
        .georgia-modal button,
        .georgia-modal select,
        .georgia-modal textarea,
        .georgia-modal label,
        .georgia-modal span,
        .georgia-modal p,
        .georgia-modal h2 {
          font-family: Georgia, serif !important;
        }
        .georgia-modal .rich-number,
        .georgia-modal span.rich-number,
        .rich-number {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }
      `}</style>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-xl bg-pill border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 max-h-[90vh] georgia-modal"
      >
        
        {/* Content Area */}
        <div className="px-8 pt-6 sm:pt-3 pb-8 flex flex-col items-center max-h-[90vh] overflow-y-auto no-scrollbar">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="self-end p-2 mb-2 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground border border-transparent hover:border-border"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Top Decorative Icon */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#16a34a]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-12 h-12 bg-[#16a34a]/10 rounded-2xl flex items-center justify-center border border-[#16a34a]/20">
                <Gift className="w-6 h-6 text-[#16a34a]" strokeWidth={1.5} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#16a34a] animate-bounce" />
            </div>
          </div>

          {/* Typography */}
          <div className="text-center space-y-1.5 mb-7">
            <h2 className="text-[1.5rem] font-[800] tracking-tight leading-[1.1]">
              Join Plugd&apos;s Referral Program
            </h2>
            <p className="text-[0.95rem] text-[#16a34a] font-bold tracking-tight">
              Refer your network to join Plugd and earn for every successful referral.
            </p>
          </div>

          {showEmailInput ? (
            <div className="w-full space-y-6 mb-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex flex-col gap-3">
                  <label className="text-[1rem] font-bold text-white tracking-wide block">Full Name</label>
                  <input 
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-3">
                  <label className="text-[1rem] font-bold text-white tracking-wide block">Email</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col gap-3">
                  <label className="text-[1rem] font-bold text-white tracking-wide block flex items-center justify-between">
                    <span>Username</span>
                    {usernameStatus === 'checking' && (
                      <span className="text-xs text-muted flex items-center gap-1 font-sans">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verifying...
                      </span>
                    )}
                  </label>
                  <input 
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
                    className={`w-full bg-black border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none transition-all text-[0.95rem] ${
                      usernameStatus === 'available' ? 'border-[#16a34a]' :
                      (usernameStatus === 'taken' || usernameStatus === 'invalid') ? 'border-red-500' :
                      'border-border focus:border-muted'
                    }`}
                  />
                  {username && usernameMessage && (
                    <p className={`text-xs mt-1 font-sans font-bold ${usernameStatus === 'available' ? 'text-[#16a34a]' : 'text-red-400'}`}>
                      {usernameMessage}
                    </p>
                  )}
                </div>

                {/* Country Selector */}
                <div className="flex flex-col gap-3">
                  <label className="text-[1rem] font-bold text-white tracking-wide block">Country</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      className="w-full flex items-center justify-between bg-black border border-border rounded-xl px-5 py-4 text-white focus:outline-none focus:border-muted transition-all text-[0.95rem] cursor-pointer text-left"
                    >
                      <span className="truncate">
                        {formData.intlBankCountry || "Select your country"}
                      </span>
                      <ChevronDown size={16} className={`text-muted transition-transform duration-200 shrink-0 ml-1 ${countryDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {countryDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setCountryDropdownOpen(false)} />
                        <div className="absolute left-0 mt-1.5 w-full bg-black border border-border rounded-xl shadow-2xl p-1 z-50 max-h-[300px] overflow-y-auto">
                          {[...COUNTRY_CODES.map(c => c.name), "Other"].map((country) => (
                            <button
                              key={country}
                              type="button"
                              onClick={() => {
                                const region = country === "India" ? "INDIA" : "INTERNATIONAL";
                                const matched = COUNTRY_CODES.find(c => c.name === country);
                                
                                setFormData({
                                  ...formData,
                                  intlBankCountry: country,
                                  payoutRegion: region,
                                  upiId: region === "INTERNATIONAL" ? "" : formData.upiId,
                                  bankAccountName: region === "INTERNATIONAL" ? "" : formData.bankAccountName,
                                  bankAccountNumber: region === "INTERNATIONAL" ? "" : formData.bankAccountNumber,
                                  bankIfsc: region === "INTERNATIONAL" ? "" : formData.bankIfsc,
                                  intlAccountHolderName: region === "INDIA" ? "" : formData.intlAccountHolderName,
                                  intlRoutingNumber: region === "INDIA" ? "" : formData.intlRoutingNumber,
                                  intlAccountNumber: region === "INDIA" ? "" : formData.intlAccountNumber,
                                  intlSortCode: region === "INDIA" ? "" : formData.intlSortCode,
                                  intlIban: region === "INDIA" ? "" : formData.intlIban,
                                  intlBicSwift: region === "INDIA" ? "" : formData.intlBicSwift,
                                  intlBsbCode: region === "INDIA" ? "" : formData.intlBsbCode,
                                  intlTransitNumber: region === "INDIA" ? "" : formData.intlTransitNumber,
                                  intlInstitutionNumber: region === "INDIA" ? "" : formData.intlInstitutionNumber,
                                  paypalEmail: region === "INDIA" ? "" : formData.paypalEmail,
                                });
                                setUsePaypal(false);
                                if (matched) {
                                  setPhoneCode(matched.dialCode);
                                }
                                setCountryDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
                                formData.intlBankCountry === country 
                                ? "bg-white/10 text-white" 
                                : "text-white/80 hover:bg-white/10"
                              }`}
                            >
                              <span className="truncate">{country}</span>
                              {formData.intlBankCountry === country && <Check size={12} className="text-white shrink-0 ml-2" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Phone Number Selector & Input */}
                <div className="flex flex-col gap-3">
                  <label className="text-[1rem] font-bold text-white tracking-wide block">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 max-w-[220px] shrink-0">
                      <button
                        type="button"
                        onClick={() => setPhoneCodeDropdownOpen(!phoneCodeDropdownOpen)}
                        className="w-full flex items-center justify-between bg-black border border-border rounded-xl px-4 py-4 text-white focus:outline-none focus:border-muted transition-all text-[0.95rem] font-sans cursor-pointer text-left"
                      >
                        <span className="truncate">
                          {(() => {
                            const matched = COUNTRY_CODES.find(c => c.dialCode === phoneCode);
                            return matched ? `${matched.name} (${matched.code} ${matched.dialCode})` : phoneCode;
                          })()}
                        </span>
                        <ChevronDown size={16} className={`text-muted transition-transform duration-200 shrink-0 ml-1 ${phoneCodeDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {phoneCodeDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setPhoneCodeDropdownOpen(false)} />
                          <div className="absolute left-0 mt-1.5 w-[260px] bg-black border border-border rounded-xl shadow-2xl p-1 z-50 max-h-[300px] overflow-y-auto">
                            {COUNTRY_CODES.map((c) => (
                              <button
                                key={`${c.code}-${c.dialCode}`}
                                type="button"
                                onClick={() => {
                                  setPhoneCode(c.dialCode);
                                  setPhoneCodeDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
                                  phoneCode === c.dialCode 
                                  ? "bg-white/10 text-white" 
                                  : "text-white/80 hover:bg-white/10"
                                }`}
                              >
                                <span className="truncate">{c.name} ({c.code} {c.dialCode})</span>
                                {phoneCode === c.dialCode && <Check size={12} className="text-white shrink-0 ml-2" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value.replace(/[^0-9]/g, ""))}
                      className="flex-1 bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem] font-sans"
                    />
                  </div>
                </div>

                {/* If country has been selected */}
                {formData.intlBankCountry && (
                  <>
                    {/* If region is INDIA */}
                    {formData.payoutRegion === "INDIA" && (
                      <div className="space-y-6">
                        {!useBankTransfer ? (
                          <div className="flex flex-col gap-3">
                            <label className="text-[1rem] font-bold text-white tracking-wide block">UPI ID</label>
                            <input
                              required={!useBankTransfer}
                              type="text"
                              placeholder="name@upi"
                              value={formData.upiId}
                              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                              className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                              <label className="text-[1rem] font-bold text-white tracking-wide block">Account Holder Name</label>
                              <input
                                required={useBankTransfer}
                                type="text"
                                placeholder="As in bank records"
                                value={formData.bankAccountName}
                                onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                                className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                              />
                            </div>
                            <div className="flex flex-col gap-3">
                              <label className="text-[1rem] font-bold text-white tracking-wide block">Bank Account Number</label>
                              <input
                                required={useBankTransfer}
                                type="text"
                                placeholder="Account number"
                                value={formData.bankAccountNumber}
                                onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                                className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                              />
                            </div>
                            <div className="flex flex-col gap-3">
                              <label className="text-[1rem] font-bold text-white tracking-wide block">IFSC Code</label>
                              <input
                                required={useBankTransfer}
                                type="text"
                                placeholder="Enter IFSC code"
                                value={formData.bankIfsc}
                                onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                                className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
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
                            id="useBankTransferModal"
                            type="checkbox"
                            checked={useBankTransfer}
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUseBankTransfer(val);
                              if (val) {
                                setFormData({ ...formData, upiId: "" });
                              } else {
                                setFormData({
                                  ...formData,
                                  bankAccountName: "",
                                  bankAccountNumber: "",
                                  bankIfsc: ""
                                });
                              }
                            }}
                            className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                          />
                          <label htmlFor="useBankTransferModal" className="text-sm font-bold text-muted cursor-pointer select-none">
                            Use bank transfer instead
                          </label>
                        </div>
                      </div>
                    )}

                    {/* If region is INTERNATIONAL */}
                    {formData.payoutRegion === "INTERNATIONAL" && (
                      <div className="space-y-6">
                        {!usePaypal ? (
                          <div className="space-y-6">
                            {getFieldsForCountry(formData.intlBankCountry || "").map((field) => (
                              <div key={field.key} className="flex flex-col gap-3">
                                <label className="text-[1rem] font-bold text-white tracking-wide block">
                                  {field.label}
                                </label>
                                <input
                                  required={field.required}
                                  type="text"
                                  placeholder={field.placeholder}
                                  value={formData[field.key as keyof typeof formData] || ""}
                                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                  className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
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
                            <label className="text-[1rem] font-bold text-white tracking-wide block">PayPal Email</label>
                            <input
                              required={usePaypal}
                              type="email"
                              placeholder="Your PayPal email"
                              value={formData.paypalEmail}
                              onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
                              className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem]"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <input
                            id="usePaypalModal"
                            type="checkbox"
                            checked={usePaypal}
                            onChange={(e) => {
                              const val = e.target.checked;
                              setUsePaypal(val);
                              if (val) {
                                setFormData({
                                  ...formData,
                                  intlAccountHolderName: "",
                                  intlRoutingNumber: "",
                                  intlAccountNumber: "",
                                  intlSortCode: "",
                                  intlIban: "",
                                  intlBicSwift: "",
                                  intlBsbCode: "",
                                  intlTransitNumber: "",
                                  intlInstitutionNumber: ""
                                });
                              } else {
                                setFormData({ ...formData, paypalEmail: "" });
                              }
                            }}
                            className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                          />
                          <label htmlFor="usePaypalModal" className="text-sm font-bold text-muted cursor-pointer select-none">
                            I don't have a bank account that accepts international wire transfers
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-7 max-w-[280px] mx-auto">
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <LinkIcon className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Share your referral link</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <IndianRupee className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Get paid for each referral</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <Infinity className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Unlimited earning potential</p>
              </div>
            </div>
          )}

          {/* Stat Boxes */}
          {!showEmailInput && (
            <div className="grid grid-cols-2 gap-3 mb-7 w-full">
              <div 
                style={{ 
                  backgroundColor: isDark ? '#262626' : '#f9f9f9',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                className="border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm"
              >
                <span style={{ color: isDark ? '#a1a1aa' : '#666666' }} className="text-[0.6rem] font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  Top referrer earnings
                </span>
                <span className="text-[1.35rem] font-[900] tracking-tighter rich-number">₹1Cr+</span>
              </div>

              <div 
                style={{ 
                  backgroundColor: isDark ? '#262626' : '#f9f9f9',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                className="border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm"
              >
                <span style={{ color: isDark ? '#a1a1aa' : '#666666' }} className="text-[0.6rem] font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  All-time earnings
                </span>
                <span className="text-[1.35rem] font-[900] tracking-tighter rich-number">₹100Cr+</span>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="w-full space-y-3">
            <button
              onClick={handleJoin}
              disabled={loading || (showEmailInput && (usernameStatus !== 'available' || !formData.name.trim() || !formData.email.trim() || !isPayoutInfoFilled() || !phoneNo.trim()))}
              className="w-full bg-[#16a34a] text-white font-[800] text-[1rem] py-[14px] rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#16a34a]/90 active:scale-[0.98] shadow-lg shadow-green-600/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{showEmailInput ? "Continue to Payment" : <>Join now for <span className="rich-number">₹199</span></>}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {showEmailInput && (
              <p className="text-center text-[10px] text-muted/40 font-medium font-sans mt-2 leading-snug">
                By continuing, you agree to our{" "}
                <Link href="/terms-of-service" className="underline hover:text-foreground transition-colors" target="_blank">
                  Terms of Service
                </Link>
                .
              </p>
            )}

            {!showEmailInput && (
              <p className="text-center text-xs text-muted/80 font-bold font-sans">
                Already a member?{" "}
                <Link href="/login" className="text-foreground hover:underline transition-all">
                  Log in
                </Link>
              </p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
