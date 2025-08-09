import React from 'react';
import Header from '@/components/Header';
import BackgroundNeo from '@/components/BackgroundNeo';
import { useTranslation } from 'react-i18next';

const terms = {
  fr: `🛡️ Notre engagement envers votre satisfaction\n\nChez Azec Unlocks, nous mettons tout en œuvre pour vous offrir une expérience simple, rapide et sécurisée.\n\nNous croyons en la qualité de nos produits et en la transparence de nos services. C’est pourquoi nous vous encourageons à consulter attentivement notre politique de remboursement avant tout achat.\n\nVotre satisfaction est notre priorité, et notre équipe reste à votre écoute pour toute question ou demande d’assistance.\n\n✅ Politique de Remboursement\n\nToutes les ventes effectuées sur notre site sont considérées comme définitives et non remboursables, sauf cas exceptionnel après évaluation par notre équipe.\n\nUn remboursement pourra être envisagé uniquement dans les situations suivantes :\n\nLe produit ne fonctionne pas sur votre appareil en raison d’une erreur avérée de notre part.\n\nVous nous contactez rapidement afin que nous puissions vous proposer une solution adaptée.\n\nImportant :\n\nNous ne vendons aucun logiciel ou programme de type « hack ». Les clés fournies sont des licences d’activation gratuites permettant d’accéder à des outils tiers.\n\nUne fois la clé livrée ou le service utilisé, aucun remboursement ne pourra être accordé.\n\nLa durée de vie d’une licence dépend exclusivement de la disponibilité du logiciel par son éditeur. En cas d’interruption ou d’arrêt du service par ce dernier, aucun remboursement ne sera possible.\n\nToute revente, partage ou redistribution de nos produits sans autorisation écrite est strictement interdite.\n\nEn validant votre commande, vous reconnaissez avoir lu, compris et accepté notre Politique de Remboursement ainsi que nos Conditions Générales d’Utilisation (CGU).`,
  en: `🛡️ Our Commitment to Your Satisfaction\n\nAt Azec Unlocks, we strive to provide you with a simple, fast, and secure experience.\n\nWe believe in the quality of our products and the transparency of our services. That’s why we encourage you to carefully review our refund policy before making any purchase.\n\nYour satisfaction is our priority, and our team is always available for any questions or assistance.\n\n✅ Refund Policy\n\nAll sales made on our site are considered final and non-refundable, except in exceptional cases after evaluation by our team.\n\nA refund may be considered only in the following situations:\n\nThe product does not work on your device due to a proven error on our part.\n\nYou contact us promptly so we can offer you an appropriate solution.\n\nImportant:\n\nWe do not sell any software or "hack" programs. The keys provided are free activation licenses that allow access to third-party tools.\n\nOnce the key is delivered or the service is used, no refund can be granted.\n\nThe lifetime of a license depends exclusively on the availability of the software by its publisher. In case of interruption or termination of the service by the latter, no refund will be possible.\n\nAny resale, sharing, or redistribution of our products without written authorization is strictly prohibited.\n\nBy confirming your order, you acknowledge that you have read, understood, and accepted our Refund Policy and Terms of Service (TOS).`
};

export default function TermsOfService() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
      <Header />
      <BackgroundNeo />
      <div className="flex-1 flex flex-col items-center justify-center py-24 z-10">
        <div className="glass-base rounded-3xl p-10 max-w-3xl w-full border border-white/10 shadow-2xl backdrop-blur-lg">
          <div className="text-white/90 whitespace-pre-line text-lg leading-relaxed">
            {terms[lang]}
          </div>
        </div>
      </div>
    </div>
  );
} 