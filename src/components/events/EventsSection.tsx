import React, { useState, useEffect } from 'react';
import { EVENTS } from '../../data/mockData';
import { Event } from '../../types';
import { Calendar, MapPin, Clock, ArrowRight, Download, CheckCircle2, X, AlertCircle } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<Event | null>(null);
  const [regForm, setRegForm] = useState({ name: '', studentId: '', email: '', track: 'Frontier Generative Systems' });
  const [regStatus, setRegStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [regMessage, setRegMessage] = useState('');

  // Countdown to Neural Nexus 2026 (Nov 14, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 16, hours: 10, minutes: 22, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date('2026-11-14T09:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const categories = ['All', 'Hackathons', 'Workshops', 'Sprints'];

  const filteredEvents = EVENTS.filter(
    (ev) => selectedCategory === 'All' || ev.category === selectedCategory
  );

  const featuredEvent = filteredEvents.find((e) => e.id === 'neural-nexus-2026') || filteredEvents[0];
  const secondaryEvents = filteredEvents.filter((e) => e.id !== featuredEvent?.id);

  // Real Calendar Export (.ics download generator)
  const downloadIcs = (event: Event) => {
    const startDate = event.rawDate.replace(/[-:]/g, '').split('.')[0] + 'Z';
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Machine Magnets NIET//Event Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}`,
      `DTSTART:${startDate}`,
      `DTEND:${startDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.studentId || !regForm.email) {
      setRegStatus('error');
      setRegMessage('Please complete all required fields.');
      return;
    }

    setRegStatus('submitting');
    setTimeout(() => {
      // Save locally to simulate authentic submission
      const existing = JSON.parse(localStorage.getItem('mm_event_registrations') || '[]');
      existing.push({
        eventId: registeringEvent?.id,
        eventTitle: registeringEvent?.title,
        ...regForm,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('mm_event_registrations', JSON.stringify(existing));

      setRegStatus('success');
      setRegMessage(`Seat reserved! Check-in pass generated for ${regForm.studentId}.`);
    }, 700);
  };

  return (
    <section
      id="events"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="events-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
              TECHNICAL GATHERINGS & SPRINT TRACKS
            </div>
            <h2
              id="events-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              Curated technical festival.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Immerse yourself in competitive hackathons, deep-dive code masterclasses, and hands-on hardware sprints organized at the NIET campus.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-white shadow-sm font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Flagship Event Card */}
        {featuredEvent && (
          <div className="mb-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Media & Laser Projection Poster */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black">
                <img
                  src={featuredEvent.coverImage}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-black/40 to-transparent pointer-events-none" />

                {/* Festival Tags in Top Left */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-[var(--color-accent)] text-white font-semibold">
                    {featuredEvent.category} · FLAGSHIP
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-amber-300 border border-amber-300/20">
                    {featuredEvent.status}
                  </span>
                </div>

                {/* Live Countdown Clock */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white">
                  <div className="text-[11px] font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    Countdown to Opening Keynote
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono">
                    <div className="bg-white/5 py-1 rounded">
                      <div className="text-xl sm:text-2xl font-bold text-[var(--color-accent)] tabular-nums">{timeLeft.days}</div>
                      <div className="text-[9px] text-neutral-400">DAYS</div>
                    </div>
                    <div className="bg-white/5 py-1 rounded">
                      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{timeLeft.hours}</div>
                      <div className="text-[9px] text-neutral-400">HOURS</div>
                    </div>
                    <div className="bg-white/5 py-1 rounded">
                      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{timeLeft.minutes}</div>
                      <div className="text-[9px] text-neutral-400">MINS</div>
                    </div>
                    <div className="bg-white/5 py-1 rounded">
                      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{timeLeft.seconds}</div>
                      <div className="text-[9px] text-neutral-400">SECS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Columns: Event Spec & Actions */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredEvent.date}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3 leading-tight">
                    {featuredEvent.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    {featuredEvent.description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="space-y-3 mb-6 text-xs text-[var(--color-text-secondary)] font-mono">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span>{featuredEvent.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--color-text-primary)] mb-6">
                    {featuredEvent.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRegisteringEvent(featuredEvent);
                      setRegStatus('idle');
                      setRegMessage('');
                    }}
                    className="flex-1 px-5 py-2.5 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Register Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadIcs(featuredEvent)}
                    className="px-4 py-2.5 text-xs font-mono text-[var(--color-text-primary)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-accent)] border border-[var(--color-border)] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Export .ics calendar invitation"
                  >
                    <Download className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span className="hidden sm:inline">Add to Calendar</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Secondary Events Grid */}
        {secondaryEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col justify-between hover:border-[var(--color-accent)]/70 card-hover-tilt"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--color-accent)] font-semibold uppercase">{ev.category}</span>
                    <span className="text-[var(--color-text-secondary)]">{ev.status}</span>
                  </div>

                  <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                    {ev.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-3">
                    {ev.description}
                  </p>

                  <div className="space-y-2 text-xs font-mono text-[var(--color-text-secondary)] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span>{ev.date} · {ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setRegisteringEvent(ev);
                      setRegStatus('idle');
                      setRegMessage('');
                    }}
                    className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Register Seat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadIcs(ev)}
                    className="text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ICS</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Event Registration Modal */}
      {registeringEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reg-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setRegisteringEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Close registration modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">
              CAMPUS EVENT REGISTRATION
            </div>

            <h3 id="reg-modal-title" className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              {registeringEvent.title}
            </h3>

            <p className="text-xs text-[var(--color-text-secondary)] mb-6">
              Official student check-in pass for NIET campus attendance.
            </p>

            {regStatus === 'success' ? (
              <div className="p-6 rounded-xl bg-[var(--color-surface-elevated)] border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-[var(--color-text-primary)]">Pass Confirmed</h4>
                <p className="text-xs text-[var(--color-text-secondary)]">{regMessage}</p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setRegisteringEvent(null)}
                    className="px-4 py-2 text-xs font-mono bg-[var(--color-accent)] text-white rounded-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    NIET Student ID / Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.studentId}
                    onChange={(e) => setRegForm({ ...regForm, studentId: e.target.value })}
                    placeholder="e.g. NIET/2024/AI108"
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    College Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="student@niet.co.in"
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                {regStatus === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-rose-500 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{regMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={regStatus === 'submitting'}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {regStatus === 'submitting' ? 'Reserving Seat...' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
