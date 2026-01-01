'use client';
import React from 'react';
import { COLORS } from '@/constants';
import Background from '@/components/Background';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import AiSpotlight from '@/components/AiSpotlight';
import Services from '@/components/Services';
import SocialManifesto from '@/components/SocialManifesto';
import EditorialSection from '@/components/EditorialSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div style={{ backgroundColor: COLORS.black, minHeight: '100vh', color: COLORS.text, overflowX: 'hidden', fontFamily: 'var(--font-inter)', position: 'relative' }}>
            <Background />
            <Header />

            <Hero />
            <Marquee />

            {/* The "Hook" Section */}
            <AiSpotlight />

            <Services />
            <SocialManifesto />
            <EditorialSection />

            <Footer />
        </div>
    );
}