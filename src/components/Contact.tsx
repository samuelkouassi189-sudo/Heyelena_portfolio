import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Globe, CreditCard, ShieldCheck, Instagram, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Création de Site Internet Sur-Mesure',
    budget: 'Demande de Devis Personnalisé par Email',
    message: '',
  });

  const email = 'elena.smith.design@gmail.com';
  const instagramUrl = 'https://instagram.com';

  const copyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#8B5CF6', '#F43F5E'],
      });
    } catch {
      // Ignore confetti errors if any
    }

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      `[Projet Elena Smith Studio] ${formData.service} - ${formData.name}`
    )}&body=${encodeURIComponent(
      `Nom & Prénom: ${formData.name}\nEmail: ${formData.email}\nPrestation: ${formData.service}\nType de projet: ${formData.budget}\n\nDescription du projet:\n${formData.message}`
    )}`;

    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#FAFAFD] bg-noise border-t border-zinc-200 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E11D48]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16 gpu-layer">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shadow-md border-2 border-[#E11D48]">
            <Globe className="w-4 h-4 text-[#F43F5E] animate-pulse" />
            <span>TRAVAIL 100% À DISTANCE — CONTACTEZ-MOI SUR INSTAGRAM OU EMAIL</span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-display font-extrabold text-[#0F172A] tracking-tight">
            DISCUTONS DE VOTRE <br />
            <span className="text-gradient-rose">PROCHAIN SITE OU AFFICHE !</span>
          </h2>
          <p className="text-base text-zinc-600 font-light max-w-xl mx-auto">
            N'hésitez pas à me contacter par email ou directement en message privé (DM) sur Instagram pour lancer votre projet.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Direct Email & Instagram Contact Left */}
          <div className="lg:col-span-5 space-y-6">
            {/* INSTAGRAM DIRECT MESSAGE CALLOUT CARD */}
            <div className="bg-gradient-to-tr from-[#E4405F] to-[#E11D48] text-white rounded-3xl p-8 shadow-xl space-y-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shadow-md">
                  <Instagram className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold text-white uppercase">
                  DM Ouverts
                </span>
              </div>

              <div>
                <h3 className="text-xs font-mono text-rose-100 uppercase tracking-widest font-bold">Contact Instagram Direct</h3>
                <p className="text-2xl font-display font-extrabold mt-1">@elena.smith.design</p>
                <p className="text-xs font-mono text-white/90 mt-2 font-light">
                  N'hésitez pas à m'envoyer un message privé sur Instagram pour discuter de vos projets de sites ou d'affiches !
                </p>
              </div>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="INSTA"
                className="w-full py-4 rounded-2xl bg-white text-[#E4405F] font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:bg-[#0F172A] hover:text-white shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>M'écrire sur Instagram (DM)</span>
              </a>
            </div>

            {/* Email Contact Card */}
            <div className="bg-white text-[#0F172A] rounded-3xl p-8 shadow-xl border border-zinc-200 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#E11D48] flex items-center justify-center text-white font-bold shadow-md">
                <Mail className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">Email Direct</h3>
                <p className="text-xl font-display font-extrabold text-[#0F172A] mt-1 break-all">{email}</p>
              </div>

              <button
                onClick={copyEmail}
                onMouseEnter={() => soundFx.playHover()}
                data-cursor="COPIER"
                className="w-full py-4 rounded-2xl bg-[#0F172A] text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:bg-[#E11D48] shadow-md"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Email copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-rose-300" />
                    <span>Copier l'adresse email</span>
                  </>
                )}
              </button>
            </div>

            {/* MOYENS DE PAIEMENT ACCEPTÉS CARD */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-150 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#E11D48]/10 text-[#E11D48] flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-extrabold text-[#0F172A]">MOYENS DE PAIEMENT ACCEPTÉS</h3>
                  <p className="text-[11px] font-mono text-zinc-500">Afrique • Europe • Amérique</p>
                </div>
              </div>

              {/* Afrique Payments */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F172A]">
                  <span>🌍 AFRIQUE :</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>WAVE</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>MOBILE MONEY (Orange, MTN, Moov)</span>
                  </span>
                </div>
              </div>

              {/* Europe & Amerique Payments */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F172A]">
                  <span>🇪🇺 🇺🇸 EUROPE & AMÉRIQUE :</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>VIREMENT BANCAIRE (RIB / IBAN)</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>CARTE BANCAIRE (Stripe / Paypal)</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-150">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paiement sécurisé avec acompte à la commande & solde à la livraison.</span>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-extrabold text-[#0F172A]">Demande reçue avec succès !</h3>
                  <p className="text-sm font-mono text-zinc-600 max-w-md mx-auto">
                    Merci {formData.name} ! Elena Smith étudie votre projet et vous répond très rapidement (par email ou Instagram DM).
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-zinc-100 text-xs font-mono uppercase text-zinc-700 hover:bg-zinc-200"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block font-bold">
                        Votre Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marc Dupont"
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[#0F172A] placeholder-zinc-400 focus:outline-none focus:border-[#E11D48] transition-colors text-sm font-mono"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block font-bold">
                        Votre Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marc@entreprise.com"
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[#0F172A] placeholder-zinc-400 focus:outline-none focus:border-[#E11D48] transition-colors text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block font-bold">
                        Prestation Souhaitée
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[#0F172A] focus:outline-none focus:border-[#E11D48] transition-colors text-sm font-mono"
                      >
                        <option>Création de Site Internet Sur-Mesure</option>
                        <option>Design de Site Internet (UI/UX Figma)</option>
                        <option>Conception d'Affiches Publicitaires</option>
                        <option>Identité Visuelle & Branding Global</option>
                        <option>Templates Web & Ebooks</option>
                      </select>
                    </div>

                    {/* Project scope / quote request */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block font-bold">
                        Type de Projet & Devis
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[#0F172A] focus:outline-none focus:border-[#E11D48] transition-colors text-sm font-mono font-bold text-[#E11D48]"
                      >
                        <option>Demande de Devis Personnalisé par Email</option>
                        <option>Affiche Publicitaire Sur-Mesure</option>
                        <option>Site Vitrine / Portfolio Professionnel</option>
                        <option>Site E-Commerce / Boutique en Ligne</option>
                        <option>Projet Complet (Site Web + Affiches)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-700 uppercase tracking-wider block font-bold">
                      Détails de votre projet *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Expliquez vos objectifs pour votre site internet ou vos affiches publicitaires..."
                      className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-[#0F172A] placeholder-zinc-400 focus:outline-none focus:border-[#E11D48] transition-colors text-sm font-mono resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onMouseEnter={() => soundFx.playHover()}
                    data-cursor="ENVOYER"
                    className="w-full py-5 rounded-2xl bg-[#E11D48] text-white font-display font-extrabold text-sm tracking-wider uppercase hover:bg-[#0F172A] transition-all shadow-xl shadow-[#E11D48]/30 flex items-center justify-center gap-3"
                  >
                    <span>Envoyer la demande</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
