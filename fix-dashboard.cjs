const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

content = content.replace(
  /import \{ useAdminInquiries, useAdminPackages, useAdminTestimonials, useAdminBlogPosts \} from "@\/hooks\/useConvex";/,
  `import { useAdminInquiries, useAdminPackages, useAdminTestimonials } from "@/hooks/useConvex";\nimport { getBlogPosts } from "@/data/blogPosts";`
);

content = content.replace(
  /const \{ data: blogs \} = useAdminBlogPosts\(\);/g,
  `const blogs = getBlogPosts();`
);

content = content.replace(
  /const publishedBlogs = blogs\?\.filter\(b => b\.is_published\)\.length \|\| 0;/g,
  `const publishedBlogs = blogs?.filter(b => b.isPublished).length || 0;` // Note: it's isPublished in the local array
);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
