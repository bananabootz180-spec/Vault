/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Maximize2, Search, Github, ArrowUpRight, LayoutGrid, Sparkles } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const filtered = gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-500">
              <Gamepad2 size={20} />
            </div>
            <span className="font-serif italic text-2xl tracking-tight">Vault</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="nav-pill opacity-60 hover:opacity-100">Library</button>
            <button className="nav-pill opacity-60 hover:opacity-100">Trending</button>
            <button className="nav-pill opacity-60 hover:opacity-100">About</button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={16} />
            <input
              type="text"
              placeholder="Find a game..."
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all w-40 md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4 block font-medium">Curated Collection</span>
            <h1 className="text-6xl md:text-8xl font-serif italic mb-8 leading-[0.9] tracking-tighter">
              The Digital <br />
              <span className="text-gradient not-italic font-sans font-semibold">Playground</span>
            </h1>
            <p className="max-w-md text-white/50 text-sm leading-relaxed font-light">
              Experience a premium selection of unblocked web games. 
              Minimalist, fast, and completely free. No distractions, just pure play.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-white/40">
            <LayoutGrid size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">All Titles</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Sparkles size={14} />
            <span className="text-[10px] uppercase tracking-widest font-bold">{filteredGames.length} Games</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
                onClick={() => handleGameSelect(game)}
              >
                <div className="glass-card rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] flex flex-col">
                  <div className="relative flex-grow overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                  <div className="p-6 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1 block">Game Title</span>
                      <h3 className="text-xl font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {game.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/10 rounded-3xl">
            <h2 className="font-serif italic text-4xl text-white/20">Nothing found</h2>
            <p className="text-white/40 text-xs mt-4 uppercase tracking-widest">Refine your search</p>
          </div>
        )}
      </main>

      {/* Game Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] game-overlay p-4 md:p-8 flex flex-col"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Now Playing</span>
                  <h2 className="text-2xl font-serif italic">{selectedGame.title}</h2>
                </div>
                <button
                  onClick={closeGame}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-white/5">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="autoplay; fullscreen; keyboard"
                />
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                  <Maximize2 size={14} /> Fullscreen Mode
                </button>
                <div className="flex items-center gap-6">
                  <span className="text-[9px] uppercase tracking-widest text-white/20">Vault v2.0.0</span>
                  <div className="flex gap-4">
                    <Github size={16} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div className="col-span-1 lg:col-span-2">
              <h2 className="text-4xl font-serif italic mb-8">Vault</h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
                A premium digital archive for unblocked entertainment. 
                Designed for those who appreciate minimalism and performance.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-bold">Navigation</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">Library</li>
                <li className="hover:text-white transition-colors cursor-pointer">Trending</li>
                <li className="hover:text-white transition-colors cursor-pointer">About</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 font-bold">Social</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-white transition-colors cursor-pointer">GitHub</li>
                <li className="hover:text-white transition-colors cursor-pointer">Discord</li>
                <li className="hover:text-white transition-colors cursor-pointer">Twitter</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
            <p className="text-[9px] uppercase tracking-widest text-white/20">© 2026 Vault Digital. All Rights Reserved.</p>
            <div className="flex gap-12 text-[9px] uppercase tracking-widest text-white/20">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
