import { AI_AUTOMATIONS_PLAYBOOK_COURSE } from '../src/lib/ai-automations-course';
import { AI_SERVICE_BUSINESS_PLAYBOOK_COURSE } from '../src/lib/ai-service-business-course';
import { AGENT_SOLUTIONS_COURSE } from '../src/lib/playbooks/agent-solutions-data';
import { FREELANCE_INCOME_COURSE } from '../src/lib/playbooks/freelance-income-data';
import { AGENCY_BLUEPRINT_COURSE } from '../src/lib/playbooks/agency-blueprint-data';
import { SMB_SERVICES_COURSE } from '../src/lib/playbooks/smb-services-data';
import { MICRO_SAAS_COURSE } from '../src/lib/playbooks/micro-saas-data';
import { LOCAL_CHATBOTS_COURSE } from '../src/lib/playbooks/local-chatbots-data';

const courses = [
  { name: '1. AI Automations', course: AI_AUTOMATIONS_PLAYBOOK_COURSE },
  { name: '2. AI Service Business', course: AI_SERVICE_BUSINESS_PLAYBOOK_COURSE },
  { name: '3. Agent Solutions', course: AGENT_SOLUTIONS_COURSE },
  { name: '4. Freelance Income', course: FREELANCE_INCOME_COURSE },
  { name: '5. Agency Blueprint', course: AGENCY_BLUEPRINT_COURSE },
  { name: '6. SMB Services', course: SMB_SERVICES_COURSE },
  { name: '7. Micro SaaS', course: MICRO_SAAS_COURSE },
  { name: '8. Local Chatbots', course: LOCAL_CHATBOTS_COURSE },
];

let allPassed = true;

courses.forEach(({ name, course }) => {
  if (!course) {
    console.error(`ERROR: course object is undefined for ${name}`);
    allPassed = false;
    return;
  }
  const modCount = course.modules?.length ?? 0;
  const lessonCounts = course.modules.map(m => m.lessons.length);
  const totalLessons = lessonCounts.reduce((a, b) => a + b, 0);
  const allLessons = course.modules.flatMap(m => m.lessons);
  const minWritten = Math.min(...allLessons.map(l => (l.writtenLesson || '').length));
  const avgWritten = Math.round(allLessons.reduce((a, l) => a + (l.writtenLesson || '').length, 0) / totalLessons);
  const minSlides = Math.min(...allLessons.map(l => (l.slides || []).length));
  
  console.log(`${name}:`);
  console.log(`  Modules: ${modCount} (Lessons per module: ${lessonCounts.join(', ')})`);
  console.log(`  Total Lessons: ${totalLessons}`);
  console.log(`  Min Slides: ${minSlides}`);
  console.log(`  Written length - Min: ${minWritten}, Avg: ${avgWritten}`);

  if (modCount !== 7) {
    console.error(`  FAIL: Expected 7 modules, got ${modCount}`);
    allPassed = false;
  }
  if (totalLessons !== 28) {
    console.error(`  FAIL: Expected 28 lessons, got ${totalLessons}`);
    allPassed = false;
  }
  if (lessonCounts.some(c => c !== 4)) {
    console.error(`  FAIL: Expected exactly 4 lessons per module`);
    allPassed = false;
  }
  if (minSlides < 2) {
    console.error(`  FAIL: Lessons must have at least 2 slides`);
    allPassed = false;
  }
  if (minWritten < 1000) {
    console.error(`  FAIL: Written lessons must have at least 1000 characters`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n>>> ALL 8 PLAYBOOKS PASSED VALIDATION (7 MODULES x 4 LESSONS = 28 LESSONS, DEEP WRITTEN GUIDES & SLIDES) <<<');
} else {
  console.error('\n>>> SOME PLAYBOOKS FAILED VALIDATION <<<');
  process.exit(1);
}
