import React, { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import BackgroundNeo from '@/components/BackgroundNeo';

// FAQ DATA
// --------------------------------------------------------------------------
type FAQItem = { question: string; answer: string };

const FAQ_KEYS = [
  'faq_q1', 'faq_q2', 'faq_q3', 'faq_q4', 'faq_q5', 'faq_q6', 'faq_q7', 'faq_q8', 'faq_q9', 'faq_q10'
];

const FAQ = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  const faqs: FAQItem[] = FAQ_KEYS.map((key, idx) => ({
    question: t(`${key}_q`),
    answer: t(`${key}_a`)
  }));

  function Question({ item, idx, open, setOpen }: { item: FAQItem; idx: number; open: number | null; setOpen: (id: number | null) => void }) {
    const isOpen = open === idx;
    const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(isOpen ? null : idx);
      }
    };
    return (
      <div className="border-b border-white/10">
        <button
          aria-controls={`faq-${idx}-panel`}
          aria-expanded={isOpen}
          onClick={() => setOpen(isOpen ? null : idx)}
          onKeyDown={handleKey}
          className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#810D0A]/70 group"
        >
          <span className="text-lg font-semibold text-white">{item.question}</span>
          <ChevronDown
            className={`ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} group-focus-visible:rotate-180`}
            size={22}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="answer"
              id={`faq-${idx}-panel`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="text-white/70 text-base pb-4 pr-2">{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
      <Header />
      <BackgroundNeo />
      <div className="flex-1 flex flex-col items-center justify-center py-24 z-10">
        <div className="w-full max-w-4xl mx-auto glass-base rounded-3xl p-10 border border-white/10 shadow-2xl backdrop-blur">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center">
            {t('faq_title')}
          </h1>
          <div className="space-y-6">
            {faqs.map((item, idx) => (
              <Question
                key={idx}
                item={item}
                idx={idx}
                open={open}
                setOpen={setOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 