import React from 'react';
import {
    AbsoluteFill,
    Easing,
    interpolate,
    Sequence,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { oswald, serif } from './fonts';

export const REEL_DURATION = 300; // 10s @ 30fps, loops seamlessly (starts + ends on black)

const BG = '#0b0a08';
const INK = '#f4efe3';
const GOLD = '#d4af37';
const ease = Easing.bezier(0.19, 1, 0.22, 1);
const easeInOut = Easing.bezier(0.77, 0, 0.175, 1);

/* ------------------------------------------------------------------ */
/* Shared bits                                                        */
/* ------------------------------------------------------------------ */

const Glow: React.FC = () => {
    const frame = useCurrentFrame();
    const x = 50 + Math.sin(frame / 60) * 12;
    const y = 45 + Math.cos(frame / 75) * 10;
    return (
        <AbsoluteFill
            style={{
                background: `radial-gradient(circle at ${x}% ${y}%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.06) 30%, transparent 60%)`,
            }}
        />
    );
};

const Waves: React.FC<{ opacity: number }> = ({ opacity }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const lines = 22;
    const pts = 60;
    const t = frame / 30;
    const paths = Array.from({ length: lines }, (_, i) => {
        const p = i / (lines - 1);
        const baseY = height * (0.55 + Math.pow(p, 1.5) * 0.48);
        const amp = 8 + p * 30;
        let d = '';
        for (let j = 0; j <= pts; j++) {
            const nx = j / pts;
            const x = nx * width;
            const y =
                baseY +
                Math.sin(nx * 6.2 + t * 1.6 + i * 0.35) * amp * 0.55 +
                Math.sin(nx * 13 - t * 1.1 + i * 0.12) * amp * 0.22 +
                Math.cos(nx * 2.4 + t * 0.6) * amp * 0.35;
            d += `${j === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return { d, alpha: 0.08 + p * 0.6 };
    });
    return (
        <AbsoluteFill style={{ opacity }}>
            <svg width={width} height={height}>
                {paths.map((l, i) => (
                    <path key={i} d={l.d} stroke={GOLD} strokeOpacity={l.alpha} strokeWidth={1.4} fill="none" />
                ))}
            </svg>
        </AbsoluteFill>
    );
};

/** A line of text that slides up from behind a mask. */
const MaskLine: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
    delay,
    children,
    style,
}) => {
    const frame = useCurrentFrame();
    const p = interpolate(frame - delay, [0, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    return (
        <div style={{ overflow: 'hidden', paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
            <div style={{ transform: `translateY(${(1 - p) * 115}%) rotate(${(1 - p) * 3}deg)`, transformOrigin: '0 100%', ...style }}>
                {children}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------ */
/* Scene 1: logo burst                                                */
/* ------------------------------------------------------------------ */

const LETTERS = ['S', 'N', 'E', 'E', 'Z', 'E', '.'];

const SceneLogo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const exit = interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut });

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* expanding rings */}
            {[0, 8, 16].map((d, i) => {
                const s = spring({ frame: frame - d, fps, config: { damping: 200 }, durationInFrames: 70 });
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: 520 + i * 260,
                            height: 520 + i * 260,
                            borderRadius: '50%',
                            border: `1.5px ${i === 1 ? 'dashed' : 'solid'} ${GOLD}`,
                            opacity: (0.45 - i * 0.12) * s * (1 - exit),
                            transform: `scale(${0.3 + s * 0.7}) rotate(${frame * (i % 2 ? -0.4 : 0.3)}deg)`,
                        }}
                    />
                );
            })}

            <div
                style={{
                    transform: `scale(${1 + exit * 0.35})`,
                    opacity: 1 - exit,
                    filter: `blur(${exit * 14}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', overflow: 'hidden', paddingBottom: 10 }}>
                    {LETTERS.map((l, i) => {
                        const s = spring({ frame: frame - 6 - i * 3, fps, config: { damping: 14, stiffness: 120, mass: 0.7 } });
                        return (
                            <span
                                key={i}
                                style={{
                                    display: 'inline-block',
                                    fontFamily: oswald,
                                    fontWeight: 700,
                                    fontSize: 290,
                                    lineHeight: 0.92,
                                    letterSpacing: '-0.03em',
                                    color: l === '.' ? GOLD : INK,
                                    transform: `translateY(${(1 - s) * 110}%)`,
                                }}
                            >
                                {l}
                            </span>
                        );
                    })}
                </div>
                <div style={{ height: 18 }} />
                <MaskLine delay={34} style={{ fontFamily: serif, fontSize: 64, color: INK, textAlign: 'center' }}>
                    Full-stack <span style={{ fontStyle: 'italic', color: GOLD }}>digital</span> agency
                </MaskLine>
            </div>
        </AbsoluteFill>
    );
};

/* ------------------------------------------------------------------ */
/* Scene 2: rolling services                                          */
/* ------------------------------------------------------------------ */

const WORDS = ['AI visuals', 'Social', 'Editorial', 'Ads', 'UGC', 'Websites'];
const PER_WORD = 15;

const SceneServices: React.FC = () => {
    const frame = useCurrentFrame();
    const enter = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: 'clamp', easing: ease });
    const exit = interpolate(frame, [92, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut });

    return (
        <AbsoluteFill>
            <Waves opacity={enter * (1 - exit)} />
            <AbsoluteFill style={{ justifyContent: 'center', paddingLeft: 140, opacity: 1 - exit, transform: `translateY(${-exit * 60}px)` }}>
                <div
                    style={{
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontSize: 22,
                        letterSpacing: '0.24em',
                        color: GOLD,
                        textTransform: 'uppercase',
                        marginBottom: 30,
                        opacity: enter,
                    }}
                >
                    ● What we make
                </div>
                <MaskLine delay={2} style={{ fontFamily: serif, fontSize: 170, color: INK, lineHeight: 1 }}>
                    We make
                </MaskLine>
                <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
                    {WORDS.map((w, i) => {
                        const start = 8 + i * PER_WORD;
                        const inP = interpolate(frame, [start, start + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
                        const outP =
                            i === WORDS.length - 1
                                ? 0
                                : interpolate(frame, [start + PER_WORD, start + PER_WORD + 10], [0, 1], {
                                      extrapolateLeft: 'clamp',
                                      extrapolateRight: 'clamp',
                                      easing: ease,
                                  });
                        const y = (1 - inP) * 110 - outP * 110;
                        return (
                            <div
                                key={w}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    fontFamily: serif,
                                    fontStyle: 'italic',
                                    fontSize: 170,
                                    lineHeight: 1,
                                    color: GOLD,
                                    transform: `translateY(${y}%)`,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {w}.
                            </div>
                        );
                    })}
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

/* ------------------------------------------------------------------ */
/* Scene 3: tagline + gold dot iris out                               */
/* ------------------------------------------------------------------ */

const SceneTagline: React.FC = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();
    const diag = Math.hypot(width, height);

    // gold dot grows to fill the frame, then collapses back to black (loop point)
    const grow = interpolate(frame, [50, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut });
    const shrink = interpolate(frame, [86, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut });
    const dotSize = interpolate(grow, [0, 1], [34, diag * 1.1]) * (1 - shrink);
    const textOut = interpolate(frame, [48, 62], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const cta = interpolate(frame, [66, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    const ctaOut = interpolate(frame, [84, 92], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', opacity: textOut }}>
                <MaskLine delay={0} style={{ fontFamily: serif, fontSize: 150, color: INK, lineHeight: 1 }}>
                    Ideas spread.
                </MaskLine>
                <MaskLine delay={6} style={{ fontFamily: serif, fontSize: 150, color: INK, lineHeight: 1 }}>
                    Like a <span style={{ fontStyle: 'italic', color: GOLD }}>sneeze</span>
                    <span style={{ opacity: grow > 0 ? 0 : 1 }}>.</span>
                </MaskLine>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: dotSize,
                    height: dotSize,
                    marginLeft: -dotSize / 2,
                    marginTop: -dotSize / 2,
                    borderRadius: '50%',
                    background: GOLD,
                    opacity: interpolate(frame, [52, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    fontFamily: oswald,
                    fontWeight: 700,
                    fontSize: 200,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: BG,
                    opacity: cta * ctaOut,
                    transform: `translateY(${(1 - cta) * 40}px) scale(${0.96 + cta * 0.04})`,
                }}
            >
                Let&apos;s talk.
            </div>
        </AbsoluteFill>
    );
};

/* ------------------------------------------------------------------ */

export const SneezeReel: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: BG }}>
            <Glow />
            <Sequence from={0} durationInFrames={110}>
                <SceneLogo />
            </Sequence>
            <Sequence from={98} durationInFrames={112}>
                <SceneServices />
            </Sequence>
            <Sequence from={196} durationInFrames={104}>
                <SceneTagline />
            </Sequence>
        </AbsoluteFill>
    );
};
