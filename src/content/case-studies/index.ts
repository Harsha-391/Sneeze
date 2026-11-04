import type { CaseStudy } from '../types';

/**
 * Case studies. Empty until real, client-approved results exist (see
 * CONTENT_TODOS.md). To add one, create e.g. ./clinic-local-seo.ts exporting a
 * CaseStudy (same shape as other content files, plus client, industry,
 * services, period, results[] with a source for every number, approved: true)
 * and add it to the array below. It then appears on /case-studies, gets its
 * own page at /case-studies/<slug> and is added to the sitemap.
 */
export const CASE_STUDIES: CaseStudy[] = [];

export const PUBLISHED_CASE_STUDIES = CASE_STUDIES.filter((c) => c.approved);
