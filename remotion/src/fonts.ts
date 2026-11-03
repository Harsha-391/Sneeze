import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Fonts are bundled in remotion/public/fonts (Latin subsets, from Google Fonts,
 * SIL Open Font License), so renders work offline and match the website.
 */
export const oswald = 'SneezeOswald';
export const serif = 'SneezeSerif';

const faces = [
    { family: oswald, file: 'fonts/Oswald-normal.woff2', style: 'normal', weight: '700' },
    { family: serif, file: 'fonts/InstrumentSerif-normal.woff2', style: 'normal', weight: '400' },
    { family: serif, file: 'fonts/InstrumentSerif-italic.woff2', style: 'italic', weight: '400' },
];

if (typeof document !== 'undefined') {
    const handle = delayRender('Loading fonts');
    Promise.all(
        faces.map((f) => {
            const face = new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, {
                style: f.style,
                weight: f.weight,
            });
            return face.load().then((loaded) => document.fonts.add(loaded));
        })
    )
        .then(() => continueRender(handle))
        .catch((err) => {
            console.error(err);
            continueRender(handle);
        });
}
