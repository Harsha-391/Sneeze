'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import { COLORS } from '../constants';

export default function Header() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        function handleClickOutside(event: MouseEvent) {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0))',
            backdropFilter: 'blur(10px)',
            // FIX: Center the content
            display: 'flex', justifyContent: 'center'
        }}>

            {/* CONTAINER: This keeps the content aligned with the rest of the site */}
            <div style={{
                width: '100%',
                maxWidth: '1280px', // The "Safe Zone" width
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '15px 20px' : '20px 40px', // Breathing room
            }}>

                {/* --- LEFT: LOGO --- */}
                <div style={{ pointerEvents: 'auto' }}>
                    <motion.div
                        onClick={() => router.push('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            fontFamily: 'var(--font-oswald)',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'white',
                            cursor: 'pointer',
                            letterSpacing: '-1px',
                            lineHeight: 1
                        }}
                    >
                        S<span style={{ color: COLORS.gold }}>.</span>M
                    </motion.div>
                </div>

                {/* --- RIGHT: BUTTONS --- */}
                <div ref={headerRef} style={{ pointerEvents: 'auto', display: 'flex', gap: isMobile ? '10px' : '15px' }}>

                    {/* CALL BUTTON */}
                    <div style={{ position: 'relative' }}>
                        <MenuButton
                            label="CALL"
                            icon={<FaPhone style={{ fontSize: isMobile ? '1rem' : '0.9rem' }} />}
                            isOpen={openMenu === 'call'}
                            onClick={() => toggleMenu('call')}
                            isMobile={isMobile}
                        />
                        <Dropdown isOpen={openMenu === 'call'}>
                            <MenuOption type="call" number="+91 9929103969" label="Primary Line" />
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
                            <MenuOption type="call" number="+91 9549791480" label="Secondary Line" />
                        </Dropdown>
                    </div>

                    {/* WHATSAPP BUTTON */}
                    <div style={{ position: 'relative' }}>
                        <MenuButton
                            label="CHAT"
                            icon={<FaWhatsapp style={{ fontSize: isMobile ? '1.2rem' : '1.1rem' }} />}
                            isOpen={openMenu === 'chat'}
                            onClick={() => toggleMenu('chat')}
                            isMobile={isMobile}
                        />
                        <Dropdown isOpen={openMenu === 'chat'}>
                            <MenuOption type="whatsapp" number="+91 9929103969" label="Primary WhatsApp" />
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 10px' }} />
                            <MenuOption type="whatsapp" number="+91 9549791480" label="Secondary WhatsApp" />
                        </Dropdown>
                    </div>

                </div>
            </div>
        </header>
    );
}

// --- SUB-COMPONENTS (Keep these exactly as they were) ---

function MenuButton({ label, icon, isOpen, onClick, isMobile }: any) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, borderColor: COLORS.gold, color: COLORS.gold }}
            whileTap={{ scale: 0.95 }}
            style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: isMobile ? '10px 14px' : '10px 20px',
                border: `1px solid ${isOpen ? COLORS.gold : 'rgba(255,255,255,0.15)'}`,
                borderRadius: '50px', backgroundColor: 'rgba(0,0,0,0.8)',
                color: isOpen ? COLORS.gold : 'white',
                fontSize: '0.85rem', fontFamily: 'var(--font-oswald)', letterSpacing: '1px', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s'
            }}
        >
            {icon}
            {!isMobile && <span>{label}</span>}
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                <FaChevronDown style={{ fontSize: '0.7rem', opacity: 0.6 }} />
            </motion.span>
        </motion.button>
    );
}

function Dropdown({ isOpen, children }: any) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute', top: '120%', right: 0,
                        width: '240px', backgroundColor: 'rgba(10, 10, 10, 0.95)',
                        border: `1px solid ${COLORS.gold}`, borderRadius: '12px', padding: '10px',
                        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.1)`,
                        display: 'flex', flexDirection: 'column', gap: '5px'
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MenuOption({ type, number, label }: { type: 'call' | 'whatsapp', number: string, label: string }) {
    const cleanNumber = number.replace(/\D/g, '');
    const href = type === 'call' ? `tel:${cleanNumber}` : `https://wa.me/${cleanNumber}`;

    return (
        <motion.a
            href={href}
            target={type === 'whatsapp' ? '_blank' : '_self'}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', x: 5 }}
            style={{ display: 'block', padding: '12px 15px', borderRadius: '8px', textDecoration: 'none', cursor: 'pointer' }}
        >
            <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', marginBottom: '2px', letterSpacing: '1px' }}>{label}</div>
            <div style={{ fontSize: '1.0rem', color: 'white', fontFamily: 'var(--font-oswald)', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {type === 'call' ? <FaPhone style={{ fontSize: '0.8rem', color: COLORS.gold }} /> : <FaWhatsapp style={{ fontSize: '0.9rem', color: COLORS.gold }} />}
                {number}
            </div>
        </motion.a>
    )
}