'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS, SERVICES_DATA } from '../constants';

export default function Services() {
    return (
        <section style={{ padding: '60px 20px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <motion.h3
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                style={{ fontFamily: 'var(--font-oswald)', fontSize: '2rem', textAlign: 'center', marginBottom: '60px', color: '#444', letterSpacing: '6px', textTransform: 'uppercase' }}
            >
                Capabilities
            </motion.h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', width: '100%' }}>
                {SERVICES_DATA.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service }: { service: any }) {
    return (
        <motion.div
            initial="rest" whileHover="hover" animate="rest"
            variants={{
                rest: { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(10, 10, 10, 0.8)' },
                hover: { borderColor: COLORS.gold, backgroundColor: 'rgba(10, 10, 10, 0.95)', zIndex: 10 }
            }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '40px', borderRadius: '0px', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                height: 'auto', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                borderWidth: '1px', borderStyle: 'solid',
            }}
        >
            <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }} transition={{ duration: 0.4 }}
                style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 70%)`, pointerEvents: 'none' }}
            />
            <div style={{ height: '50px', marginBottom: '25px', position: 'relative', zIndex: 1 }}>
                <motion.div variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: -10 } }} style={{ fontSize: '2.5rem', color: '#444', position: 'absolute' }}>{service.iconMain}</motion.div>
                <motion.div variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }} style={{ fontSize: '2.5rem', color: COLORS.gold, position: 'absolute', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' }}>{service.iconHover}</motion.div>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: '1.4rem', margin: '0 0 15px 0', textTransform: 'uppercase', color: 'white', letterSpacing: '1px' }}>{service.title}</h4>
                <p style={{ color: '#888', lineHeight: 1.6, marginBottom: '25px', fontSize: '0.95rem', fontWeight: '300' }}>{service.desc}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                {service.tags.map((tag: string, i: number) => (
                    <motion.span key={i} variants={{ rest: { color: '#555', borderColor: 'rgba(255,255,255,0.1)' }, hover: { color: COLORS.gold, borderColor: COLORS.gold } }} style={{ fontSize: '0.7rem', padding: '6px 12px', borderWidth: '1px', borderStyle: 'solid', letterSpacing: '1px', textTransform: 'uppercase' }}>{tag}</motion.span>
                ))}
            </div>
        </motion.div>
    );
}