const fs = require('fs');
const path = require('path');

// Read existing module 3 lessons from earlier
const { MODULE_03_LESSONS } = require('./module3-data.cjs');
const { MODULE_04_LESSONS } = require('./module4-data.cjs');
const { MODULE_05_LESSONS } = require('./module5-data.cjs');

const fileHeader = `import { Lesson } from "@/lib/playbooks-data";

export interface ExtendedLesson extends Lesson {
  learningObjective: string;
  writtenLesson: string;
  takeaway: string;
}

// ==========================================
// MODULE 03: Business #2 — AI Creative & Short-Form Content Studio
// ==========================================
export const MODULE_03_LESSONS: ExtendedLesson[] = ${JSON.stringify(MODULE_03_LESSONS, null, 2)};

// ==========================================
// MODULE 04: Business #3 — AI Shadow Operating for Micro-Creators
// ==========================================
export const MODULE_04_LESSONS: ExtendedLesson[] = ${JSON.stringify(MODULE_04_LESSONS, null, 2)};

// ==========================================
// MODULE 05: The AI Shadow Operator Launch & Monetization Engine
// ==========================================
export const MODULE_05_LESSONS: ExtendedLesson[] = ${JSON.stringify(MODULE_05_LESSONS, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/ai-automations-content-2.ts'), fileHeader, 'utf8');
console.log('Successfully written src/lib/ai-automations-content-2.ts');
