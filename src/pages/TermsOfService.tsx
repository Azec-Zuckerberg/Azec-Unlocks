import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#181818] rounded-2xl shadow border border-[#232323] px-8 py-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
        <div className="text-xs text-white/40 mb-8">Date: 11 February 2025</div>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p className="text-white/80 text-sm">Your access to and use of our service is conditioned upon your acceptance of and compliance with these terms. If you do not agree, please do not use our service.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">2. Changes to Terms</h2>
          <p className="text-white/80 text-sm">We reserve the right to update these terms at any time. It is your responsibility to review them periodically. Continued use of our service after modifications constitutes acceptance of the new terms.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">3. Limitation of Liability</h2>
          <p className="text-white/80 text-sm">We shall not be held responsible for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our service. We do not guarantee the accuracy or reliability of the service content.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">4. Termination</h2>
          <p className="text-white/80 text-sm">We reserve the right to suspend or terminate your access to our service at any time, without prior notice, if we determine that you have violated these terms.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">5. Software Sales</h2>
          <p className="text-white/80 text-sm">Our service provides software products for sale. By purchasing our software, you acknowledge that you have read and understood the product details, system requirements, and any usage guidelines.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2">6. Purchases and Refunds</h2>
          <p className="text-white/80 text-sm">All purchases made through our service are final. We do not offer refunds or exchanges under any circumstances. Please ensure that you review your order carefully before completing the purchase.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-2">7. In-Game Ban Disclaimer</h2>
          <p className="text-white/80 text-sm">Our software products are intended for use in gaming environments. However, we are not responsible for any bans, suspensions, or penalties that may be imposed by game developers or platform providers as a result of using our software.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 