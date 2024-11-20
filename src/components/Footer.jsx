import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">FilmFusion</h2>
            <p className="text-sm">Your ultimate destination for all things cinema.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/movies" className="hover:text-white transition-colors">Movies</a></li>
              <li><a href="/tv-shows" className="hover:text-white transition-colors">TV Shows</a></li>
              <li><a href="/upcoming" className="hover:text-white transition-colors">Upcoming Releases</a></li>
              <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with the latest movie news and releases!</p>
            <form className="space-y-2">
              <input type="email" placeholder="Your email address" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" />
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} FilmFusion . All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Youtube size={20} />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;