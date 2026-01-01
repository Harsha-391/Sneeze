'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaChevronDown } from 'react-icons/fa';
import { COLORS } from '../constants';

export default function Header() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsContactOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px',
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0))',
            backdropFilter: 'blur(5px)', pointerEvents: 'none'
        }}>
            <div ref={menuRef} style={{ pointerEvents: 'auto', position: 'relative' }}>
                <motion.button
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    whileHover={{ scale: 1.05, borderColor: COLORS.gold, color: COLORS.gold }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px',
                        border: `1px solid ${isContactOpen ? COLORS.gold : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: '50px', backgroundColor: 'rgba(0,0,0,0.8)',
                        color: isContactOpen ? COLORS.gold : 'white',
                        fontSize: '0.9rem', fontFamily: 'var(--font-oswald)', letterSpacing: '2px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'all 0.3s'
                    }}
                >
                    <FaPhone style={{ fontSize: '0.9rem' }} /> INITIATE CALL
                    <motion.span animate={{ rotate: isContactOpen ? 180 : 0 }}>
                        <FaChevronDown style={{ fontSize: '0.7rem', opacity: 0.6 }} />
                    </motion.span>
                </motion.button>

                <AnimatePresence>
                    {isContactOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute', top: '120%', left: '50%', x: '-50%',
                                width: '240px', backgroundColor: 'rgba(10, 10, 10, 0.95)',
                                border: `1px solid ${COLORS.gold}`, borderRadius: '12px', padding: '10px',
                                boxShadow: `0 10px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.1)`,
                                display: 'flex', flexDirection: 'column', gap: '5px'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: 'rgba(10, 10, 10, 0.95)', borderLeft: `1px solid ${COLORS.gold}`, borderTop: `1px solid ${COLORS.gold}` }} />
                            <MenuOption number="+91 9929103969" label="Primary Line" />
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
                            <MenuOption number="+91 9549791480" label="Secondary Line" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

function MenuOption({ number, label }: { number: string, label: string }) {
    return (
        <motion.a
            href={`tel:${number.replace(/\s/g, '')}`}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', x: 5 }}
            style={{ display: 'block', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', cursor: 'pointer' }}
        >
            <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', marginBottom: '2px', letterSpacing: '1px' }}>{label}</div>
            <div style={{ fontSize: '1.1rem', color: 'white', fontFamily: 'var(--font-oswald)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaPhone style={{ fontSize: '0.8rem', color: COLORS.gold }} /> {number}
            </div>
        </motion.a>
    )
}