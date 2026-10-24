const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadModuleExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = ts.transpileModule(content, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', result.outputText);
  fn(m, m.exports, (id) => {
    if (id === './playbooks-data' || id === '../playbooks-data' || id === '@/lib/playbooks-data') {
      return {};
    }
    return {};
  });
  return m.exports;
}

test('1. Cross-Module Boundary Navigation across all playbooks', () => {
  const dataPath = path.join(__dirname, '../src/lib/playbooks-data.ts');
  const content = fs.readFileSync(dataPath, 'utf8');
  
  // Verify helper functions exist and handle cross-module boundaries
  assert.ok(content.includes('export function getNextLesson'), 'getNextLesson helper exported');
  assert.ok(content.includes('export function getPreviousLesson'), 'getPreviousLesson helper exported');
  assert.ok(content.includes('allLessons.push({ lesson: l, module: mod })'), 'allLessons flattens modules for boundary crossing');
  assert.ok(content.includes('return allLessons[currentIndex + 1]'), 'getNextLesson seamlessly transitions across module boundaries');
  assert.ok(content.includes('return allLessons[currentIndex - 1]'), 'getPreviousLesson seamlessly transitions back across module boundaries');
});

test('2. Every Playbook has slides AND comprehensive written guide for every lesson', () => {
  const playbookDataFiles = [
    'src/lib/playbooks/agent-solutions-data.ts',
    'src/lib/playbooks/freelance-income-data.ts',
    'src/lib/playbooks/agency-blueprint-data.ts',
    'src/lib/playbooks/smb-services-data.ts',
    'src/lib/playbooks/micro-saas-data.ts',
    'src/lib/playbooks/local-chatbots-data.ts',
  ];

  let totalPlaybooksAudited = 0;
  let totalLessonsAudited = 0;

  playbookDataFiles.forEach(file => {
    const exports = loadModuleExports(path.join(__dirname, '..', file));
    const courseKey = Object.keys(exports).find(k => k.endsWith('_COURSE'));
    assert.ok(courseKey, `Course found in ${file}`);
    const course = exports[courseKey];
    assert.ok(course && course.modules, `Course object valid in ${file}`);
    totalPlaybooksAudited++;

    course.modules.forEach(module => {
      assert.ok(module.lessons && module.lessons.length > 0, `Module ${module.number} has lessons in ${course.title}`);
      module.lessons.forEach(lesson => {
        totalLessonsAudited++;
        // 1. Must have slides
        assert.ok(lesson.slides && lesson.slides.length > 0, `Lesson ${lesson.id} in ${course.title} must have slides`);
        
        // 2. Must have substantive written lesson
        const written = lesson.writtenLesson || lesson.writtenContent || '';
        assert.ok(
          written.length >= 300,
          `Lesson ${lesson.id} (${lesson.title}) in ${course.title} must have substantive written content (found length: ${written.length})`
        );
        assert.ok(
          !written.toLowerCase().includes('coming soon'),
          `Lesson ${lesson.id} must not be a placeholder`
        );
      });
    });
  });

  console.log(`Audited ${totalPlaybooksAudited} courses with ${totalLessonsAudited} lessons. All have slides & full written guides!`);
});

test('3. Player components feature parity: outside-click capture listener & boundary navigation', () => {
  const templateFiles = [
    'src/components/SlideViewer.tsx',
    'src/components/WrittenLessonViewer.tsx',
    'src/components/slide-templates/AgencyRevenueSlideView.tsx',
    'src/components/slide-templates/AgenticMatrixSlideView.tsx',
    'src/components/slide-templates/QuadrantRevenueSlideView.tsx',
    'src/components/slide-templates/AgencyChronicleSlideView.tsx',
    'src/components/slide-templates/CatalogServiceSlideView.tsx',
    'src/components/slide-templates/CodeTerminalSlideView.tsx',
    'src/components/slide-templates/ConversationalFlowSlideView.tsx',
  ];

  templateFiles.forEach(relPath => {
    const filePath = path.join(__dirname, '..', relPath);
    assert.ok(fs.existsSync(filePath), `File exists: ${relPath}`);
    const code = fs.readFileSync(filePath, 'utf8');

    // Outside-click with capture phase (true parameter)
    assert.ok(
      code.includes('addEventListener("mousedown", handlePointerDown, true)') ||
      code.includes("addEventListener('mousedown', handlePointerDown, true)"),
      `${relPath} must use capture-phase event listener for outside click`
    );

    // Escape key dismiss
    assert.ok(
      code.includes('"Escape"') || code.includes("'Escape'"),
      `${relPath} must handle Escape key dismiss`
    );

    // Module & Lesson dropdown refs
    assert.ok(
      code.includes('moduleDropdownRef') && code.includes('lessonDropdownRef'),
      `${relPath} must maintain moduleDropdownRef and lessonDropdownRef`
    );

    // Mutual exclusivity
    assert.ok(
      code.includes('setIsLessonDropdownOpen(false)') || code.includes('setIsModuleDropdownOpen(false)'),
      `${relPath} must toggle dropdowns mutually exclusively`
    );

    // If it's a slide viewer (not pure written viewer), test boundary navigation
    if (!relPath.includes('WrittenLessonViewer')) {
      assert.ok(
        code.includes('nextLesson') && code.includes('router.push'),
        `${relPath} must navigate to nextLesson across boundaries`
      );
      assert.ok(
        code.includes('disabled={currentIndex === 0 && !previousLesson}'),
        `${relPath} must only disable Previous button if currentIndex === 0 AND no previousLesson`
      );
    }
  });
});
