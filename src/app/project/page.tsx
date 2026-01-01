'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants';
import Background from '@/components/Background';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProjectPage() {
    // PASTE YOUR ACCESS KEY HERE
    // Go to web3forms.com to get one for free.
    const ACCESS_KEY = "cc43b0dc-0e85-4c41-95a4-7c64e1378e8f";

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        email: '',
        objective: 'Brand Identity',
        details: ''
    });

    const [status, setStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    ...formData,
                    subject: `New Project Inquiry: ${formData.brand}` // Email Subject
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', brand: '', email: '', objective: 'Brand Identity', details: '' }); // Clear form
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div style={{ backgroundColor: COLORS.black, minHeight: '100vh', color: COLORS.text, fontFamily: 'var(--font-inter)' }}>
            <Background />
            <Header />

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '160px 20px 100px 20px',
                position: 'relative',
                zIndex: 10
            }}>

                {/* HEADING */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(3rem, 5vw, 5rem)', textTransform: 'uppercase', margin: 0 }}>
                        Initiate <span style={{ color: COLORS.gold }}>Protocol</span>
                    </h1>
                    <p style={{ color: COLORS.textMuted, fontSize: '1.1rem', marginTop: '10px', letterSpacing: '1px' }}>
                        Tell us about your vision. We will handle the rest.
                    </p>
                </motion.div>

                {/* SUCCESS MESSAGE (Shows after sending) */}
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            padding: '40px', background: 'rgba(212, 175, 55, 0.1)', border: `1px solid ${COLORS.gold}`,
                            textAlign: 'center', borderRadius: '8px'
                        }}
                    >
                        <h3 style={{ color: COLORS.gold, fontFamily: 'var(--font-oswald)', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>Request Received</h3>
                        <p style={{ color: 'white' }}>We have received your dossier. Our team will contact you shortly.</p>
                        <button
                            onClick={() => setStatus(null)}
                            style={{ marginTop: '20px', background: 'transparent', border: 'none', color: '#888', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            Send another request
                        </button>
                    </motion.div>
                ) : (
                    /* FORM */
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={labelStyle}>NAME</label>
                                <input name="name" required value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" style={inputStyle} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={labelStyle}>BRAND</label>
                                <input name="brand" required value={formData.brand} onChange={handleChange} type="text" placeholder="Company / Brand Name" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={labelStyle}>EMAIL</label>
                            <input name="email" required value={formData.email} onChange={handleChange} type="email" placeholder="name@company.com" style={inputStyle} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={labelStyle}>OBJECTIVE</label>
                            <select name="objective" value={formData.objective} onChange={handleChange} style={inputStyle}>
                                <option style={{ background: 'black' }}>Brand Identity</option>
                                <option style={{ background: 'black' }}>Social Media Dominance</option>
                                <option style={{ background: 'black' }}>Editorial / Product Shoots</option>
                                <option style={{ background: 'black' }}>Web Development</option>
                                <option style={{ background: 'black' }}>Other</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={labelStyle}>DETAILS</label>
                            <textarea name="details" required value={formData.details} onChange={handleChange} rows={5} placeholder="Describe your project goals..." style={{ ...inputStyle, resize: 'vertical' }} />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: COLORS.gold, color: 'black' }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === 'submitting'}
                            type="submit"
                            style={{
                                marginTop: '20px', padding: '20px', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase',
                                background: 'transparent', border: `1px solid ${COLORS.gold}`, color: COLORS.gold,
                                cursor: status === 'submitting' ? 'wait' : 'pointer', letterSpacing: '2px', opacity: status === 'submitting' ? 0.5 : 1
                            }}
                        >
                            {status === 'submitting' ? 'Transmitting...' : 'Submit Request'}
                        </motion.button>

                        {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Transmission failed. Please try again.</p>}

                    </form>
                )}

            </div>

            <Footer />
        </div>
    );
}

const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '15px',
    color: 'white',
    fontSize: '1rem',
    borderRadius: '4px',
    outline: 'none',
    width: '100%'
};

const labelStyle = {
    color: COLORS.gold,
    fontSize: '0.8rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: 'bold'
};