import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#181818] rounded-2xl shadow border border-[#232323] px-8 py-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <div className="text-xs text-white/40 mb-8">Last updated: July 2024</div>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p className="text-white/80 text-sm">By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">2. Use of Service</h2>
          <p className="text-white/80 text-sm">You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for your own actions while using the service.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">3. Purchases & Refunds</h2>
          <p className="text-white/80 text-sm">All purchases are final. Refunds are only provided at our discretion and under specific circumstances outlined on this site.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">4. Changes to Terms</h2>
          <p className="text-white/80 text-sm">We reserve the right to update or change these Terms of Service at any time. Changes will be posted on this page with an updated date.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">5. Contact</h2>
          <p className="text-white/80 text-sm">If you have any questions about these Terms, please contact us at <a href="mailto:azecunlocks@gmail.com" className="text-blue-400 underline">azecunlocks@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms; 