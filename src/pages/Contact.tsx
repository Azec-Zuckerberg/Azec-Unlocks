import React from 'react';
import { Mail, MapPin, Phone, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundNeo from '@/components/BackgroundNeo';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

/**
 * Contact page – modern glassmorphism, dark-theme, accent #810D0A.
 * Dependencies (add once):  npm i lucide-react framer-motion
 */
export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
      <Header />
      <BackgroundNeo />
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="grid w-full max-w-5xl lg:grid-cols-2 gap-10 px-6 lg:px-0 z-10">
          {/* ───────────────── Info panel ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="glass-base rounded-3xl p-10 flex flex-col justify-between backdrop-blur-lg border border-white/10 shadow-2xl"
          >
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-4">
                {t('contact_title')}
                <span className="text-[#810D0A]">{t('contact_title_accent')}</span>
              </h1>
              <p className="text-white/70 leading-relaxed">
                {t('contact_subtitle')}
              </p>
            </div>

            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-[#810D0A]" />
                <span className="text-white/80">{t('contact_location')}</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#810D0A]" />
                <span className="text-white/80">{t('contact_email')}</span>
              </li>
            </ul>
          </motion.div>

          {/* ───────────────── Form panel ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-base rounded-3xl p-10 backdrop-blur-lg border border-white/10 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {t('contact_form_title')}
            </h2>

            {/* Success / error banners */}
            <AnimatePresence mode="wait">
              {/* Removed loading state banners */}
            </AnimatePresence>

            <form 
              className="flex flex-col gap-5" 
              action="https://formsubmit.co/azecunlocks@gmail.com"
              method="POST"
              target="_blank"
            >
              <input
                type="text"
                name="name"
                placeholder={t('contact_name_placeholder')}
                className="bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#810D0A] placeholder-white/40"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact_email_placeholder')}
                className="bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#810D0A] placeholder-white/40"
                required
              />
              <textarea
                name="message"
                placeholder={t('contact_message_placeholder')}
                rows={5}
                className="bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#810D0A] resize-none placeholder-white/40"
                required
              ></textarea>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#810D0A] hover:bg-[#a11a16] text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                {t('contact_send_message')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 