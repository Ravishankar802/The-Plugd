"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string;
  followers: number;
}

interface DirectoryTableProps {
  accounts: Account[];
  isLoading?: boolean;
}

export default function DirectoryTable({ accounts, isLoading }: DirectoryTableProps) {
  return (
    <div className="w-full bg-[#111111] rounded-2xl border border-border overflow-hidden mb-8">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-2xl font-bold">Index</h2>
        <button className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-border">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 6l-9.5 9.5-5-5L1 18" />
            <path d="M17 6h6v6" />
          </svg>
          Recently Added
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="directory-table">
          <thead>
            <tr>
              <th className="w-16">#</th>
              <th>Profile</th>
              <th className="w-48 text-center">X Handle</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id} className="directory-row group transition-colors">
                <td className="text-muted text-sm">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img
                        src={account.avatarUrl}
                        alt={account.name}
                        className="w-full h-full rounded-full object-cover border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-lg leading-tight group-hover:text-white transition-colors">
                        {account.name}
                      </div>
                      <div className="text-muted text-sm line-clamp-1">
                        {account.bio}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <Link
                    href={`https://x.com/${account.xHandle}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-white hover:text-black transition-all px-4 py-2 rounded-lg border border-border x-handle text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @{account.xHandle}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {accounts.length === 0 && !isLoading && (
        <div className="p-12 text-center text-muted">
          No accounts found matching your search.
        </div>
      )}
      
      {isLoading && (
        <div className="p-12 text-center text-muted">
          Loading accounts...
        </div>
      )}
    </div>
  );
}
