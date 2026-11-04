import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Druk Condensed (Commercial Type) is a licensed font, so it isn't bundled.
 * Drop the licensed web files into public/fonts/druk/ (any of .woff2 / .woff
 * / .otf / .ttf) and they are picked up automatically at build time: weight
 * and style come from the file name (Medium, Bold, Heavy, Super, Italic).
 *
 * Until the files are there, visitors who have Druk installed see it via
 * local(), and everyone else sees the fallback (Anton) from --font-display.
 */
const DIR = join(process.cwd(), 'public/fonts/druk');

const WEIGHTS: [RegExp, number][] = [
    [/super/i, 900],
    [/heavy/i, 800],
    [/bold/i, 700],
    [/medium/i, 500],
    [/regular|book/i, 400],
];

const FORMAT: Record<string, string> = { woff2: 'woff2', woff: 'woff', otf: 'opentype', ttf: 'truetype' };

type Face = { weight: number; italic: boolean; urls: string[] };

function scan(): Face[] {
    if (!existsSync(DIR)) return [];
    const files = readdirSync(DIR).filter((f) => /\.(woff2?|otf|ttf)$/i.test(f));
    const faces = new Map<string, Face>();
    for (const f of files) {
        const weight = WEIGHTS.find(([re]) => re.test(f))?.[1] ?? 900;
        const italic = /italic|oblique/i.test(f);
        const key = `${weight}-${italic}`;
        const face = faces.get(key) ?? { weight, italic, urls: [] };
        face.urls.push(`/fonts/druk/${f}`);
        faces.set(key, face);
    }
    // woff2 first in each src list
    for (const face of faces.values()) face.urls.sort((a, b) => Number(b.endsWith('.woff2')) - Number(a.endsWith('.woff2')));
    return [...faces.values()];
}

const FACES = scan();

/** The file to preload: the upright Super (or the heaviest upright weight found). */
export const DRUK_PRELOAD = FACES.filter((f) => !f.italic)
    .sort((a, b) => b.weight - a.weight)[0]
    ?.urls.find((u) => u.endsWith('.woff2'));

export const DRUK_FOUND = FACES.length > 0;

/** @font-face rules: always the local() faces, plus any files found in public/fonts/druk. */
export function drukCss() {
    const rules = [
        `@font-face{font-family:'Druk Condensed';font-weight:900;font-style:normal;font-display:swap;src:local('Druk Condensed Super'),local('DrukCond-Super');}`,
        `@font-face{font-family:'Druk Condensed';font-weight:900;font-style:italic;font-display:swap;src:local('Druk Condensed Super Italic'),local('DrukCond-SuperItalic');}`,
    ];
    for (const f of FACES) {
        const src = f.urls.map((u) => `url('${u}') format('${FORMAT[u.split('.').pop()!.toLowerCase()]}')`).join(',');
        rules.push(`@font-face{font-family:'Druk Condensed';font-weight:${f.weight};font-style:${f.italic ? 'italic' : 'normal'};font-display:swap;src:${src};}`);
    }
    return rules.join('');
}
