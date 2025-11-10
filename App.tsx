import React, { useState, useRef, useEffect } from 'react';

// Icon for the dropdown button on desktop
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// Icon for the menu button on mobile
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const pages = [
  { name: 'Document 1', path: '/page1.html' },
  { name: 'Document 2', path: '/page2.html' },
  { name: 'Document 3', path: '/page3.html' },
];

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>(pages[0].path);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect to handle closing the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentPage = pages.find(p => p.path === selectedPage) || pages[0];

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* Header Navigation */}
      <header className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg z-20">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* App Title */}
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <h1 className="text-lg md:text-xl font-bold ml-3">DMLT PRACTICAL SUPER NOTES</h1>
            </div>
            
            {/* Navigation Menu */}
            <div className="relative" ref={menuRef}>
                {/* Desktop Dropdown Button */}
                <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="hidden md:flex items-center justify-between w-56 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                >
                    <span className="font-medium">{`View: ${currentPage.name}`}</span>
                    <ChevronDownIcon />
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    aria-label="Open menu"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                >
                    <MenuIcon />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-xl z-10 border border-gray-200 dark:border-gray-700">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {pages.map(page => (
                                <button
                                    key={page.name}
                                    onClick={() => {
                                        setSelectedPage(page.path);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full text-left block px-4 py-2 text-sm font-medium transition-colors ${
                                        selectedPage === page.path
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                    role="menuitem"
                                >
                                    {page.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-2 md:p-6 overflow-hidden">
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <iframe
            key={selectedPage} // key is important to force re-render on src change
            src={selectedPage}
            title="Content Viewer"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </main>
    </div>
  );
};

export default App;