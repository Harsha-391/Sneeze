import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { getPost, POST_PAGES } from '@/content/registry';
import { articleSchema, breadcrumbSchema, faqSchema, metaFor } from '@/content/seo';
import { plainText, wordCount } from '@/lib/md-core';
import { formatDate } from '@/lib/dates';

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return POST_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    return post ? metaFor(post, `/blog/${slug}`) : {};
}

export default async function PostRoute({ params }: Props) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();
    const path = `/blog/${slug}`;
    const minutes = Math.max(1, Math.round(wordCount(plainText(post.body)) / 220));
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.name, path },
    ];
    return (
        <>
            <JsonLd data={[articleSchema(post, path), breadcrumbSchema(crumbs), faqSchema(post.faq)]} />
            <Longform
                page={post}
                path={path}
                variant="post"
                eyebrow={post.category}
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref="/contact"
                faqEyebrow={`FAQ · ${post.category}`}
                meta={
                    <p className="lf-byline">
                        <span>By {post.author}</span>
                        <span>
                            Published <time dateTime={post.published}>{formatDate(post.published)}</time>
                        </span>
                        {post.updated !== post.published && (
                            <span>
                                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                            </span>
                        )}
                        <span>{minutes} min read</span>
                    </p>
                }
            />
        </>
    );
}
