import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost, Profile, Explore, Favorites, EditPost, About } from './page';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] sticky top-0 z-50">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-[#222328] hover:text-[#6469ff] font-medium transition-colors">Home</Link>
          <Link to="/explore" className="text-[#222328] hover:text-[#6469ff] font-medium transition-colors">Explore</Link>
          <Link to="/favorites" className="text-[#222328] hover:text-[#6469ff] font-medium transition-colors">Favorites</Link>
          <Link to="/about" className="text-[#222328] hover:text-[#6469ff] font-medium transition-colors">About</Link>
          <Link to="/create-post" className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#535bf2] transition-colors">Create</Link>
        </nav>

        <button
          className="md:hidden p-2 text-[#222328]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-[#e6ebf4] px-4 py-4 space-y-2">
          <Link to="/" className="block py-2 text-[#222328] hover:text-[#6469ff] font-medium">Home</Link>
          <Link to="/explore" className="block py-2 text-[#222328] hover:text-[#6469ff] font-medium">Explore</Link>
          <Link to="/favorites" className="block py-2 text-[#222328] hover:text-[#6469ff] font-medium">Favorites</Link>
          <Link to="/about" className="block py-2 text-[#222328] hover:text-[#6469ff] font-medium">About</Link>
          <Link to="/create-post" className="block py-2 font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md text-center">Create</Link>
        </nav>
      )}

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;