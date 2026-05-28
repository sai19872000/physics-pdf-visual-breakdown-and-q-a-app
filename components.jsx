/* ─────────────────────────────────────────────────────────────────────────
   Aura Design System — Physics Q&A shared components
   ───────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ── Minimal Aura Brand Mark ──────────────────────────────────────
function AuraRing({ size = 20 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="6" style={{ transform: "rotate(-45deg)" }}>
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="180 180" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeDasharray="90 90" strokeWidth="4" />
    </svg>
  );
}

// ── SVG Icon component ──────────────────────────────────────────
function Icon({ name, size = 16, className = "" }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L20 20"/></>,
    bell:   <><path d="M6 9a6 6 0 1112 0c0 6 2 8 2 8H4s2-2 2-8z"/><path d="M10 20a2 2 0 004 0"/></>,
    close:  <><path d="M6 6l12 12M18 6L6 18" /></>,
    chevron: <path d="M9 6l6 6-6 6" />,
    arrow:  <path d="M5 12h14M13 6l6 6-6 6" />,
    pdf:    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6" />,
    send:   <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />,
    zoomIn: <path d="M12 5v14M5 12h14" />,
    zoomOut: <path d="M5 12h14" />,
    trash:  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />,
    crop:   <path d="M6.13 1L6 16a2 2 0 002 2h15M1 6.13L16 6a2 2 0 012 2v15" />
  };
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      {paths[name] || null}
    </svg>
  );
}

// ── Extracted Visual Card component ──────────────────────────────
function ExtractedCard({ card, isActive, onClick, onDelete }) {
  return (
    <div className={`gallery-card ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="gallery-card-thumb-container">
        <img src={card.imageUrl} alt={card.label} className="gallery-card-thumb" />
      </div>
      <div className="gallery-card-footer">
        <span className="gallery-card-label" title={card.label}>{card.label}</span>
        <span className="gallery-card-page">p.{card.pageNumber}</span>
      </div>
      {onDelete && (
        <button 
          className="clear-ref-btn" 
          style={{ position: "absolute", top: "4px", right: "4px", backgroundColor: "rgba(13,27,30,0.8)", padding: "2px", borderRadius: "2px" }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          title="delete selection"
        >
          <Icon name="close" size={10} />
        </button>
      )}
    </div>
  );
}

// ── Export to window object ─────────────────────────────────────
Object.assign(window, {
  AuraRing,
  Icon,
  ExtractedCard
});
