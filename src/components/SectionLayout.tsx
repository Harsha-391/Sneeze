'use client';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    direction?: 'ltr' | 'rtl';
    heading: React.ReactNode;
    description: React.ReactNode;
    graphic: React.ReactNode;
};

export default function SectionLayout({ direction = 'ltr', heading, description, graphic }: Props) {
    return (
        <section className="sneeze-layout">
            <div className={`sneeze-container ${direction}`}>

                <div className="layout-heading">
                    {heading}
                </div>

                <div className="layout-graphic">
                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                    >
                        {graphic}
                    </motion.div>
                </div>

                <div className="layout-desc">
                    {description}
                </div>

            </div>

            <style jsx>{`
                .sneeze-layout {
                    padding: 80px 20px;
                    max-width: 1280px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                    color: #ffffff;
                }

                .sneeze-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 30px;
                }

                .layout-heading {
                    order: 1;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    z-index: 20;
                }

                .layout-graphic {
                    order: 2;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                }

                .layout-desc {
                    order: 3;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    z-index: 20;
                }

                @media (min-width: 900px) {
                    .sneeze-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto auto;
                        gap: 0px;
                        column-gap: 80px;
                        align-items: center;
                    }

                    .layout-heading {
                        text-align: left;
                        order: unset;
                        margin-bottom: 10px;
                    }

                    .layout-desc {
                        text-align: left;
                        order: unset;
                        margin-top: 10px;
                    }

                    .sneeze-container.ltr .layout-heading {
                        grid-column: 1;
                        grid-row: 1;
                        align-self: end;
                    }

                    .sneeze-container.ltr .layout-desc {
                        grid-column: 1;
                        grid-row: 2;
                        align-self: start;
                    }

                    .sneeze-container.ltr .layout-graphic {
                        grid-column: 2;
                        grid-row: 1 / span 2;
                    }

                    .sneeze-container.rtl .layout-heading {
                        grid-column: 2;
                        grid-row: 1;
                        align-self: end;
                    }

                    .sneeze-container.rtl .layout-desc {
                        grid-column: 2;
                        grid-row: 2;
                        align-self: start;
                    }

                    .sneeze-container.rtl .layout-graphic {
                        grid-column: 1;
                        grid-row: 1 / span 2;
                    }
                }
            `}</style>
        </section>
    );
}