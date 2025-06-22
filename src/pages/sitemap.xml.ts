import { fetchPosts, fetchPostCategories, type Post, type PostCategory } from '../lib/api/posts.ts';

export async function GET() {
  const baseUrl = 'http://localhost:4321';
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/gioi-thieu', priority: '0.8', changefreq: 'monthly' },
    { url: '/dich-vu', priority: '0.9', changefreq: 'weekly' },
    { url: '/lien-he', priority: '0.7', changefreq: 'monthly' },
    { url: '/bai-viet', priority: '0.8', changefreq: 'daily' },
    { url: '/danh-muc', priority: '0.7', changefreq: 'weekly' }
  ];

  // Lấy dữ liệu thực từ API
  const posts = await fetchPosts();
  const categories = await fetchPostCategories();

  // Tạo XML sitemap với format đẹp
  const staticUrls = staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  // Dynamic routes cho bài viết từ API thực tế
  const postUrls = posts.length > 0 ? posts.map(post => `  <url>
    <loc>${baseUrl}/bai-viet/${post.slug}</loc>
    <lastmod>${post.updated_at}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n') : '';

  // Dynamic routes cho danh mục từ API thực tế
  const categoryUrls = categories.length > 0 ? categories.map(category => `  <url>
    <loc>${baseUrl}/danh-muc/${category.slug}</loc>
    <lastmod>${category.updated_at}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n') : '';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}${postUrls ? '\n' + postUrls : ''}${categoryUrls ? '\n' + categoryUrls : ''}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}