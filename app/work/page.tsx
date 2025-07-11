import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navigation from '@/components/Navigation';
import WorkGrid from '@/components/WorkGrid';
import AnimatedText from '@/components/AnimatedText';

interface WorkItem {
  title: string;
  category: string;
  tech: string[];
  size: string;
  color: string;
  date: string;
  priority: number;
  content: string;
}

async function getWorkData(): Promise<WorkItem[]> {
  const worksDirectory = path.join(process.cwd(), 'DB', 'work');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(worksDirectory)) {
    fs.mkdirSync(worksDirectory, { recursive: true });
    
    // Create sample work files
    const sampleWorks = [
      {
        filename: 'mobile-game.md',
        content: `---
title: Mobile Game
category: iOS Development
tech:
  - Swift
  - SpriteKit
  - CoreAnimation
size: 2x1
color: from-[#ABBAA9]/15 to-[#ABBAA9]/8
date: 2025-06-15
priority: 2
---
An immersive mobile gaming experience built with Swift and SpriteKit, featuring fluid animations and intuitive touch controls that create engaging gameplay mechanics.`
      },
      {
        filename: 'web-platform.md',
        content: `---
title: Web Platform
category: Full Stack Development
tech:
  - Next.js
  - TypeScript
  - PostgreSQL
  - Tailwind CSS
size: 3x2
color: from-white/12 to-white/6
date: 2024-12-20
priority: 1
---
A scalable web platform built with modern technologies, focusing on performance and user experience with sophisticated data management and real-time features.`
      },
      {
        filename: 'design-system.md',
        content: `---
title: Design System
category: UI/UX Design
tech:
  - Figma
  - Tailwind CSS
  - Storybook
  - React
size: 2x2
color: from-[#8B9DC3]/20 to-[#8B9DC3]/10
date: 2024-11-10
priority: 3
---
A comprehensive design system that ensures consistency across multiple platforms and products, featuring reusable components and design tokens.`
      },
      {
        filename: 'interactive-art.md',
        content: `---
title: Interactive Art
category: Creative Technology
tech:
  - Three.js
  - WebGL
  - GSAP
  - Canvas API
size: 1x3
color: from-[#DDA15E]/18 to-[#DDA15E]/9
date: 2024-10-05
priority: 4
---
An experimental project exploring the intersection of technology and creative expression through interactive 3D art installations and generative visuals.`
      },
      {
        filename: 'mobile-app.md',
        content: `---
title: Mobile App
category: React Native
tech:
  - React Native
  - Expo
  - Firebase
  - Redux
size: 1x2
color: from-white/15 to-white/8
date: 2024-09-15
priority: 5
---
A cross-platform mobile application with real-time features and modern UI design, focusing on seamless user experience across iOS and Android.`
      },
      {
        filename: 'api-service.md',
        content: `---
title: API Service
category: Backend Development
tech:
  - Node.js
  - Express
  - MongoDB
  - Docker
size: 2x1
color: from-[#BC6C25]/16 to-[#BC6C25]/8
date: 2024-08-20
priority: 6
---
A robust API service designed for scalability and performance, serving multiple client applications with comprehensive authentication and data management.`
      },
      {
        filename: 'e-commerce.md',
        content: `---
title: E-Commerce Platform
category: Full Stack Development
tech:
  - Next.js
  - Stripe
  - Prisma
  - PostgreSQL
size: 3x1
color: from-[#606C38]/14 to-[#606C38]/7
date: 2024-07-12
priority: 7
---
A modern e-commerce platform with advanced features including payment processing, inventory management, and analytics dashboard.`
      },
      {
        filename: 'data-visualization.md',
        content: `---
title: Data Visualization
category: Frontend Development
tech:
  - D3.js
  - React
  - TypeScript
  - WebGL
size: 1x1
color: from-[#283618]/20 to-[#283618]/10
date: 2024-06-08
priority: 8
---
Interactive data visualization tools that transform complex datasets into intuitive and engaging visual narratives for better decision making.`
      }
    ];
    
    sampleWorks.forEach((work) => {
      fs.writeFileSync(path.join(worksDirectory, work.filename), work.content);
    });
  }
  
  try {
    const filenames = fs.readdirSync(worksDirectory);
    const markdownFiles = filenames.filter(name => name.endsWith('.md'));
    
    const works = markdownFiles.map((name) => {
      const filePath = path.join(worksDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        title: data.title || 'Untitled',
        category: data.category || 'Uncategorized',
        tech: Array.isArray(data.tech) ? data.tech : [],
        size: data.size || '1x1',
        color: data.color || 'from-white/10 to-white/5',
        date: data.date || new Date().toISOString(),
        priority: data.priority || 999,
        content: content || '',
      } as WorkItem;
    });
    
    return works;
  } catch (error) {
    console.error('Error reading work files:', error);
    return [];
  }
}

export default async function WorkPage() {
  const works = await getWorkData();
  
  return (
    <div className="min-h-screen bg-black grain-overlay">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <AnimatedText delay={0.5}>
            <div className="mb-16 md:mb-24">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-light mb-8 text-balance tracking-tight">
                Selected Work
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl font-inter leading-relaxed font-light">
                A curated collection of projects spanning digital experiences, creative technology, and thoughtful design solutions.
              </p>
            </div>
          </AnimatedText>
          
          <WorkGrid works={works} />
        </div>
      </main>
    </div>
  );
}