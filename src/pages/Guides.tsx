import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundNeo from '@/components/BackgroundNeo';

/* -------------------------------------------------------------------------- */
/*  GUIDE DATA – always shown                                                 */
/* -------------------------------------------------------------------------- */
type Guide = { title: string; content: React.ReactNode };

const Guides = () => {
  const { t } = useTranslation();
  const guides: Guide[] = [
    {
      title: t('guide0_title'),
      content: (
        <>
          <h3 className="text-xl font-bold mb-2 text-red-400">Critical Warning</h3>
          <p className="mb-4 text-white/80">
            Antivirus software <strong>must be completely disabled</strong> before you continue.
            Both Windows Defender and any third-party AV have to be off, otherwise the required
            tools will be detected and removed.
          </p>

          <h4 className="text-lg font-semibold mb-2">Download DCONTROL</h4>
          <p className="mb-2">Grab the helper tool and run it with admin rights:</p>
          <a
            href="https://mega.nz/file/wbdwTShD#J3v0zbmUcC1G_wCFuw9luIKCzLuiHAK9pVg0k_cmNOc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 px-4 py-2 rounded-xl bg-[#810D0A] text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Download DCONTROL.zip (445 KB)
          </a>
          <p className="mb-6 text-sm text-white/60">
            <em>Important: Right-click <code>DCONTROL.exe</code> → "Run as administrator".</em>
          </p>

          <h4 className="text-lg font-semibold mb-2">Instructions (DCONTROL)</h4>
          <ol className="list-decimal list-inside space-y-1 mb-6">
            <li>Extract the downloaded ZIP anywhere on your PC.</li>
            <li>Right-click <code>DCONTROL.exe</code> and select "Run as administrator".</li>
            <li>Click <strong>Disable Windows Defender</strong> and wait until it finishes.</li>
            <li>Restart your computer when prompted.</li>
          </ol>

          <h4 className="text-lg font-semibold mb-2">
            Turn Off Windows Defender Manually (Backup Method)
          </h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Open <strong>Windows Security</strong> → <kbd>Virus &amp; Threat Protection</kbd>.
            </li>
            <li>Disable:</li>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Real-time protection</li>
              <li>Cloud-delivered protection</li>
              <li>Automatic sample submission</li>
              <li>Tamper protection</li>
            </ul>
          </ol>
        </>
      )
    },
    {
      title: t('guide1_title'),
      content: (
        <>
          <h3 className="text-xl font-bold mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Disable real-time antivirus or add <code>AzecLoader.exe</code> to exceptions.
            </li>
            <li>
              Download the latest build from your dashboard and extract it anywhere{' '}
              <em>outside</em> the game folder.
            </li>
            <li>Right-click <code>AzecLoader.exe</code> → "Run as administrator".</li>
            <li>Paste your licence key when prompted.</li>
            <li>Launch the game once the loader shows "Injected ✅".</li>
          </ol>
        </>
      )
    },
    {
      title: t('guide2_title'),
      content: (
        <>
          <h3 className="text-xl font-bold mb-2">Quick Fixes</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Crash on launch?</strong> Check that Windows Defender{' '}
              <em>Core Isolation / Memory Integrity</em> is off.
            </li>
            <li>
              <strong>Loader stuck at "Waiting for game"</strong> – Start the loader{' '}
              <em>before</em> you open the game.
            </li>
            <li>
              <strong>Black screen after injection</strong> – Toggle to windowed mode once,
              then back to fullscreen.
            </li>
          </ul>
        </>
      )
    },
    {
      title: t('guide3_title'),
      content: (
        <>
          <p className="mb-2">
            Our build is undetected as of <strong>June 28&nbsp;2025</strong>, but follow these
            rules:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use a fresh Windows user account dedicated to gaming.</li>
            <li>Avoid streaming your screen with overlays enabled.</li>
            <li>Re-download the loader after every game update—never reuse an old copy.</li>
            <li>Keep Windows and GPU drivers fully updated.</li>
          </ul>
        </>
      )
    },
    {
      title: t('guide4_title'),
      content: (
        <>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your dashboard at <code>dashboard.azec-unlocks.com</code>.</li>
            <li>Download the build marked <strong>Latest</strong>.</li>
            <li>Delete the old folder completely to avoid mix-ups.</li>
            <li>Extract and run the new loader as in the installation guide.</li>
          </ol>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
      <BackgroundNeo />
      <Header />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center pt-32 pb-16 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4 text-center"
        >
          {t('guides_title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/70 text-lg max-w-2xl text-center px-6"
        >
          {t('guides_subtitle')}
        </motion.p>
      </section>

      {/* Guides List */}
      <main className="flex-1 w-full px-4 z-10">
        <ul className="max-w-4xl mx-auto space-y-6">
          {guides.map((guide, idx) => (
            <li key={idx} className="border border-white/10 rounded-2xl glass-base backdrop-blur-md p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white">{guide.title}</h2>
              <div className="text-white/80 text-base space-y-3">{guide.content}</div>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default Guides; 