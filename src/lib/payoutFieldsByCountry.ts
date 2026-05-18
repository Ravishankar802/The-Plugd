export type IntlPayoutField = 
  | "intlAccountHolderName"
  | "intlRoutingNumber"
  | "intlAccountNumber"
  | "intlSortCode"
  | "intlIban"
  | "intlBicSwift"
  | "intlBsbCode"
  | "intlTransitNumber"
  | "intlInstitutionNumber";

export type FieldConfig = {
  key: IntlPayoutField;
  label: string;
  placeholder: string;
  required: boolean;
};

export const PAYOUT_FIELDS_BY_COUNTRY: Record<string, FieldConfig[]> = {
  "United States": [
    { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
    { key: "intlRoutingNumber", label: "Routing Number (ABA)", placeholder: "9-digit routing number", required: true },
    { key: "intlAccountNumber", label: "Account Number", placeholder: "Your account number", required: true },
  ],
  "United Kingdom": [
    { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
    { key: "intlSortCode", label: "Sort Code", placeholder: "6-digit sort code e.g. 20-00-00", required: true },
    { key: "intlAccountNumber", label: "Account Number", placeholder: "8-digit account number", required: true },
  ],
  "Australia": [
    { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
    { key: "intlBsbCode", label: "BSB Code", placeholder: "6-digit BSB code", required: true },
    { key: "intlAccountNumber", label: "Account Number", placeholder: "Your account number", required: true },
  ],
  "Canada": [
    { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
    { key: "intlTransitNumber", label: "Transit Number", placeholder: "5-digit transit number", required: true },
    { key: "intlInstitutionNumber", label: "Institution Number", placeholder: "3-digit institution number", required: true },
    { key: "intlAccountNumber", label: "Account Number", placeholder: "Your account number", required: true },
  ],
};

// EU countries that use IBAN + BIC
const EU_COUNTRIES = [
  "Germany", "France", "Netherlands", "Belgium", "Austria", "Spain", "Portugal",
  "Italy", "Sweden", "Denmark", "Finland", "Norway", "Switzerland", "Poland",
  "Czech Republic", "Hungary", "Romania", "Bulgaria", "Croatia", "Slovakia",
  "Slovenia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Cyprus",
  "Greece", "Iceland"
];

EU_COUNTRIES.forEach(country => {
  PAYOUT_FIELDS_BY_COUNTRY[country] = [
    { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
    { key: "intlIban", label: "IBAN", placeholder: "e.g. DE89370400440532013000", required: true },
    { key: "intlBicSwift", label: "BIC / SWIFT Code", placeholder: "8 or 11 character BIC", required: true },
  ];
});

// Generic fallback for all other countries
export const GENERIC_INTL_FIELDS: FieldConfig[] = [
  { key: "intlAccountHolderName", label: "Account Holder Name", placeholder: "As in bank records", required: true },
  { key: "intlAccountNumber", label: "Account Number", placeholder: "Your bank account number", required: true },
  { key: "intlBicSwift", label: "SWIFT / BIC Code", placeholder: "Enter SWIFT or BIC code", required: true },
];

export function getFieldsForCountry(country: string): FieldConfig[] {
  return PAYOUT_FIELDS_BY_COUNTRY[country] || GENERIC_INTL_FIELDS;
}
