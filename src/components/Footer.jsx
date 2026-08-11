import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF5EB] border-t border-softpink-200 pt-16 pb-12 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-softpink-200/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-softpink-400 via-pink-500 to-rosewood-500 flex items-center justify-center text-white font-extrabold text-xl shadow">
                P
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 font-serif">PASCO</span>
                <span className="text-[10px] font-bold tracking-widest text-softpink-600 uppercase">
                  Foods Limited
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed max-w-sm">
              Home to a unique fusion of exotic flavours from around the world. Master blenders of authentic Indian curry cooking sauces, spice pastes, pickles, chutneys, and foodservice solutions since 1992.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 text-gray-500 pt-2">
              <a
                href="https://www.facebook.com/pascofoods"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-softpink-200 hover:text-softpink-600 hover:border-softpink-400 transition-colors"
                title="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/pascofoods/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-softpink-200 hover:text-softpink-600 hover:border-softpink-400 transition-colors"
                title="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/pascofoods"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white border border-softpink-200 hover:text-softpink-600 hover:border-softpink-400 transition-colors"
                title="Twitter"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-serif">
              Our Ranges
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li><a href="#products" className="hover:text-softpink-600 transition-colors">Cooking Sauces</a></li>
              <li><a href="#products" className="hover:text-softpink-600 transition-colors">Cooking Pastes</a></li>
              <li><a href="#products" className="hover:text-softpink-600 transition-colors">Pickles & Chutneys</a></li>
              <li><a href="#foodservice" className="hover:text-softpink-600 transition-colors">Foodservice & Catering</a></li>
              <li><a href="#recipes" className="hover:text-softpink-600 transition-colors">Recipe Inspirations</a></li>
            </ul>
          </div>

          {/* Col 3: Quality Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-serif">
              Quality Promises
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Natural Ingredients</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Certified Gluten Free</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Vegetarian & Vegan Options</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> No Artificial Colors</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> BRCGS Food Safety Certified</li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 font-serif">
              Contact Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-softpink-500 flex-shrink-0 mt-0.5" />
                <span>Pasco House, Makerfield Way, Ince, Wigan, Lancashire WN2 2PR, UK</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-softpink-500 flex-shrink-0" />
                <span>+44 (0) 1942 493220</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-softpink-500 flex-shrink-0" />
                <span>sales@pascofoods.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Pasco Foods Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Pasco Foods Assignment</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
