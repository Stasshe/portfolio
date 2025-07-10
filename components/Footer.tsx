"use client";

export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-[#ABBAA9]/20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
              Connect
            </div>
            <div className="space-y-2 text-sm font-light">
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                LinkedIn
              </a>
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                GitHub
              </a>
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                Email
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
              Work
            </div>
            <div className="space-y-2 text-sm font-light">
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                Projects
              </a>
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                Case Studies
              </a>
              <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                Blog
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
              Available for
            </div>
            <div className="text-sm font-light">
              Freelance projects
              <br />
              Collaboration opportunities
              <br />
              Full-time positions
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#ABBAA9]/20">
          <div className="text-xs text-[#2C2319]/60 font-light">
            © 2025 Portfolio. Crafted with precision and passion.
          </div>
        </div>
      </div>
    </footer>
  );
}
