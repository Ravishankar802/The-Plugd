"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Link as LinkIcon, DollarSign, Infinity, Gift, Sparkles, Loader2, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { getFieldsForCountry } from "@/lib/payoutFieldsByCountry";

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
    if (!formData.name.trim() || !formData.email.trim() || !isPayoutInfoFilled() || !username.trim()) {
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
    const baseUrl = `https://www.checkout.dodopayments.com/buy/${process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID}`;
    
    let finalReferralCode = referralCode;
    if (!finalReferralCode && typeof document !== "undefined") {
      const cookies = document.cookie.split("; ");
      const match = cookies.find(row => row.startsWith("plugd_ref="));
      if (match) {
        finalReferralCode = match.split("=")[1] || "";
      }
    }

    const params = new URLSearchParams({
      quantity: '1',
      redirect_url: redirectUrl,
      showDiscounts: 'false',
      customer_email: formData.email,
      metadata_type: 'promoter',
      metadata_name: formData.name,
      metadata_email: formData.email,
      metadata_username: username.trim(),
      metadata_payoutMethod: derivedMethod,
      metadata_payoutDetails: derivedDetails,
      metadata_payoutRegion: formData.payoutRegion,
      metadata_upiId: formData.upiId,
      metadata_bankAccountName: formData.bankAccountName,
      metadata_bankAccountNumber: formData.bankAccountNumber,
      metadata_bankIfsc: formData.bankIfsc,
      metadata_intlAccountHolderName: formData.intlAccountHolderName,
      metadata_intlRoutingNumber: formData.intlRoutingNumber,
      metadata_intlAccountNumber: formData.intlAccountNumber,
      metadata_intlSortCode: formData.intlSortCode,
      metadata_intlIban: formData.intlIban,
      metadata_intlBicSwift: formData.intlBicSwift,
      metadata_intlBsbCode: formData.intlBsbCode,
      metadata_intlTransitNumber: formData.intlTransitNumber,
      metadata_intlInstitutionNumber: formData.intlInstitutionNumber,
      metadata_intlBankCountry: formData.intlBankCountry,
      metadata_paypalEmail: formData.paypalEmail,
      ...(finalReferralCode ? { metadata_referralCode: finalReferralCode } : {})
    });

    const checkoutUrl = `${baseUrl}?${params.toString()}`;
    console.log("DODO_DEBUG: Constructed Checkout URL:", checkoutUrl);
    window.location.href = checkoutUrl;
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
                    <select
                      value={formData.intlBankCountry || ""}
                      onChange={(e) => {
                        const country = e.target.value;
                        const region = country === "India" ? "INDIA" : "INTERNATIONAL";
                        setFormData({
                          ...formData,
                          intlBankCountry: country,
                          payoutRegion: region,
                          // clear fields that don't apply
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
                      }}
                      className="w-full bg-black border border-border rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all text-[0.95rem] appearance-none pr-10"
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
                  <DollarSign className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
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
                <span className="text-[1.35rem] font-[900] tracking-tighter rich-number">$100K+</span>
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
                <span className="text-[1.35rem] font-[900] tracking-tighter rich-number">$10M+</span>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="w-full space-y-3">
            <button
              onClick={handleJoin}
              disabled={loading || (showEmailInput && (usernameStatus !== 'available' || !formData.name.trim() || !formData.email.trim() || !isPayoutInfoFilled()))}
              className="w-full bg-[#16a34a] text-white font-[800] text-[1rem] py-[14px] rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#16a34a]/90 active:scale-[0.98] shadow-lg shadow-green-600/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{showEmailInput ? "Continue to Payment" : <>Join now for <span className="rich-number">$2</span></>}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

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
