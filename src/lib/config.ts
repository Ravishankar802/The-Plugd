/**
 * Global Platform Configuration
 *
 * During the content review phase, all Playbooks are free and accessible.
 * Setting IS_REVIEW_PHASE_FREE_ACCESS = true enables full access across
 * the catalog, syllabus, and lesson slide viewers.
 *
 * To re-enable the paid checkout gate later, set NEXT_PUBLIC_REVIEW_PHASE_FREE_ACCESS="false"
 * in the environment variables, or toggle this constant to false.
 */
export const IS_REVIEW_PHASE_FREE_ACCESS = true;
