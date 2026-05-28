/* ─────────────────────────────────────────────────────────────────────────
   Aura Design System — Physics Q&A Main Application
   ───────────────────────────────────────────────────────────────────────── */

const { useState: us, useEffect: ue, useRef: ur, useCallback: uc, useMemo: umm } = React;

const SAMPLE_PAGES = {
  1: {
    title: "1. Classical Field Equations & Gauss's Law",
    content: (
      <div className="mock-pdf-page">
        <div className="mock-pdf-header">Journal of Advanced Physics · Vol. 42</div>
        <div className="mock-pdf-title">Visual Breakdown of Maxwell's Relation Fields</div>
        <div className="mock-pdf-authors">Saiteja A. · Aura Research Group</div>
        
        <p>
          Classical electrodynamics is formulated around four fundamental relations, known collectively as Maxwell's equations. In this breakdown, we examine the visual representation of Gauss's Law (D-1) and how physical field distributions relate to localized charges.
        </p>

        <div className="mock-pdf-section">1.1 Gauss's Divergence Law</div>
        <p>
          Gauss's law states that the net electric flux through any closed hypothetical surface is equal to the net charge enclosed by that surface divided by the vacuum permittivity.
        </p>

        <div className="mock-pdf-equation-block" data-block-id="eq_gauss">
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>∇ · E = ρ / ε₀</span>
          <div className="bounding-box-label" style={{ top: '-18px', bottom: 'auto' }}>eq 1.1 · gauss divergence</div>
        </div>

        <p>
          Here, ∇ · E represents the divergence of the electric field, ρ represents the volume charge density, and ε₀ is the vacuum permittivity constant. This differential form describes field divergence at a singular point.
        </p>

        <div className="mock-pdf-section">1.2 Field Flux Schematic</div>
        <p>
          We visualize the electric field divergence around a point charge using vector field lines penetrating a spherical Gaussian surface, as sketched below.
        </p>

        <div className="mock-pdf-diagram-block" data-block-id="fig_flux">
          <svg viewBox="0 0 400 160" className="mock-svg-diagram" width="300" height="120">
            {/* Gaussian Sphere */}
            <circle cx="200" cy="80" r="40" fill="none" stroke="#666666" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Charge center */}
            <circle cx="200" cy="80" r="5" fill="#000000" />
            <text x="195" y="70" fontSize="10" fontFamily="sans-serif" fontWeight="bold">+q</text>
            {/* Field Lines */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 200 + 10 * Math.cos(angle);
              const y1 = 80 + 10 * Math.sin(angle);
              const x2 = 200 + 75 * Math.cos(angle);
              const y2 = 80 + 75 * Math.sin(angle);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1B2236" strokeWidth="1.5" />
                  {/* Arrowheads */}
                  <polygon points={`${x2},${y2} ${x2 - 8 * Math.cos(angle - 0.3)},${y2 - 8 * Math.sin(angle - 0.3)} ${x2 - 8 * Math.cos(angle + 0.3)},${y2 - 8 * Math.sin(angle + 0.3)}`} fill="#1B2236" />
                </g>
              );
            })}
            <text x="250" y="45" fontSize="10" fontFamily="sans-serif" fontStyle="italic">Gaussian Surface (S)</text>
            <text x="135" y="110" fontSize="10" fontFamily="sans-serif">Electric Field (E)</text>
          </svg>
          <div className="mock-pdf-diagram-caption">Figure 1.1: Net electric flux through Gaussian boundary.</div>
        </div>
      </div>
    )
  },
  2: {
    title: "2. Faraday's Law & Electromagnetic Induction",
    content: (
      <div className="mock-pdf-page">
        <div className="mock-pdf-header">Journal of Advanced Physics · Vol. 42</div>
        
        <div className="mock-pdf-section">2.1 Faraday's Law of Induction</div>
        <p>
          Faraday's law describes how a time-varying magnetic field induces an electromotive force (EMF), leading to an electric field curl around the magnetic flux core.
        </p>

        <div className="mock-pdf-equation-block" data-block-id="eq_faraday">
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>∇ × E = -∂B / ∂t</span>
          <div className="bounding-box-label" style={{ top: '-18px', bottom: 'auto' }}>eq 2.1 · faraday curl</div>
        </div>

        <p>
          The curl of the electric field (∇ × E) is directly proportional to the negative rate of change of the magnetic B-field over time (∂B/∂t).
        </p>

        <div className="mock-pdf-section">2.2 Induction Loop Diagram</div>
        <p>
          Consider a circular conducting loop placed in a perpendicular magnetic field that increases over time. The induced current creates a secondary field to oppose the flux change.
        </p>

        <div className="mock-pdf-diagram-block" data-block-id="fig_induction">
          <svg viewBox="0 0 400 160" className="mock-svg-diagram" width="300" height="120">
            {/* Loop */}
            <ellipse cx="200" cy="80" rx="70" ry="25" fill="none" stroke="#1B2236" strokeWidth="2.5" />
            {/* Induced Current arrows */}
            <path d="M130,80 A70,25 0 0,0 270,80" fill="none" stroke="#1B2236" strokeWidth="0" />
            <polygon points="270,80 265,72 260,78" fill="#1B2236" />
            <text x="250" y="98" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Induced I</text>
            
            {/* Magnetic field vectors */}
            {[-40, 0, 40].map((dx, i) => (
              <g key={i}>
                <line x1={200 + dx} y1={130} x2={200 + dx} y2={30} stroke="#666666" strokeWidth="1.2" strokeDasharray="3 3" />
                <polygon points={`${200+dx},30 ${200+dx-4},38 ${200+dx+4},38`} fill="#666666" />
              </g>
            ))}
            <text x="250" y="35" fontSize="10" fontFamily="sans-serif" fontStyle="italic">Increasing B(t)</text>
          </svg>
          <div className="mock-pdf-diagram-caption">Figure 2.1: Conducting loop in time-varying B-field.</div>
        </div>
      </div>
    )
  }
};

function App() {
  const [activePage, setActivePage] = us(1);
  const [cards, setCards] = us([
    {
      id: "card_gauss_sample",
      label: "eq 1.1 · gauss divergence",
      pageNumber: 1,
      imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60' style='background:%23FFFFFF'><text x='35' y='36' font-size='16' font-family='serif' font-weight='bold'>∇ · E = ρ / ε₀</text></svg>",
      contextText: "Gauss's law in differential form: ∇ · E = ρ / ε₀. It states that the divergence of the electric field is proportional to the localized charge density."
    }
  ]);
  const [selectedCardId, setSelectedCardId] = us("card_gauss_sample");
  const [chat, setChat] = us([
    {
      id: "msg_welcome",
      role: "assistant",
      text: "welcome to aura physics workspace. drag a bounding box on the pdf page to extract an equation or diagram, or select an item from the extraction gallery to ask contextual questions.",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = us("");
  const [isSending, setIsSending] = us(false);

  // Box Drawing state
  const [dragStart, setDragStart] = us(null);
  const [dragCurrent, setDragCurrent] = us(null);
  const [isDrawing, setIsDrawing] = us(false);
  const pageContainerRef = ur(null);

  // Mouse handlers for drawing bounding boxes on PDF
  const handleMouseDown = (e) => {
    if (!pageContainerRef.current) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !dragStart) return;
    const rect = pageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setDragCurrent({ x, y });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !dragStart || !dragCurrent) {
      setIsDrawing(false);
      setDragStart(null);
      setDragCurrent(null);
      return;
    }

    const x1 = Math.min(dragStart.x, dragCurrent.x);
    const y1 = Math.min(dragStart.y, dragCurrent.y);
    const w = Math.abs(dragStart.x - dragCurrent.x);
    const h = Math.abs(dragStart.y - dragCurrent.y);

    setIsDrawing(false);
    setDragStart(null);
    setDragCurrent(null);

    // Only create card if selection is reasonably sized
    if (w > 15 && h > 15) {
      // Figure out which elements are overlapped
      const elements = pageContainerRef.current.querySelectorAll('[data-block-id]');
      let matchedBlock = null;

      for (let el of elements) {
        const elRect = el.getBoundingClientRect();
        const parentRect = pageContainerRef.current.getBoundingClientRect();
        const elLeft = elRect.left - parentRect.left;
        const elTop = elRect.top - parentRect.top;
        const elWidth = elRect.width;
        const elHeight = elRect.height;

        // Check bounding box intersection
        if (
          x1 < elLeft + elWidth &&
          x1 + w > elLeft &&
          y1 < elTop + elHeight &&
          y1 + h > elTop
        ) {
          matchedBlock = el.getAttribute('data-block-id');
          break;
        }
      }

      let newCard = null;
      const cardId = "card_" + Date.now();

      if (matchedBlock === "eq_gauss" || (activePage === 1 && y1 < 400 && !matchedBlock)) {
        newCard = {
          id: cardId,
          label: "eq 1.1 · gauss divergence",
          pageNumber: 1,
          imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60' style='background:%23FFFFFF'><text x='35' y='36' font-size='16' font-family='serif' font-weight='bold'>∇ · E = ρ / ε₀</text></svg>",
          contextText: "Gauss's law in differential form: ∇ · E = ρ / ε₀. It states that the divergence of the electric field is proportional to the localized charge density."
        };
      } else if (matchedBlock === "fig_flux" || (activePage === 1 && y1 >= 400 && !matchedBlock)) {
        newCard = {
          id: cardId,
          label: "fig 1.1 · electric flux",
          pageNumber: 1,
          imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='90' viewBox='0 0 160 90' style='background:%23FFFFFF'><circle cx='80' cy='45' r='18' fill='none' stroke='%236666' stroke-dasharray='2 2'/><circle cx='80' cy='45' r='2.5' fill='%23000'/><line x1='80' y1='45' x2='110' y2='45' stroke='%231B2236'/><polygon points='110,45 106,42 106,48' fill='%231B2236'/></svg>",
          contextText: "Figure 1.1 shows net electric flux lines emanating radially from a positive point charge +q through a Gaussian boundary."
        };
      } else if (matchedBlock === "eq_faraday" || (activePage === 2 && y1 < 400 && !matchedBlock)) {
        newCard = {
          id: cardId,
          label: "eq 2.1 · faraday curl",
          pageNumber: 2,
          imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60' style='background:%23FFFFFF'><text x='35' y='36' font-size='16' font-family='serif' font-weight='bold'>∇ × E = -∂B / ∂t</text></svg>",
          contextText: "Faraday's law in differential form: ∇ × E = -∂B / ∂t. It describes how curl of electric field equals change of magnetic field over time."
        };
      } else if (matchedBlock === "fig_induction" || (activePage === 2 && y1 >= 400 && !matchedBlock)) {
        newCard = {
          id: cardId,
          label: "fig 2.1 · induction loop",
          pageNumber: 2,
          imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='90' viewBox='0 0 160 90' style='background:%23FFFFFF'><ellipse cx='80' cy='45' rx='30' ry='12' fill='none' stroke='%231B2236' stroke-width='2'/><line x1='80' y1='65' x2='80' y2='25' stroke='%236666' stroke-dasharray='2 2'/></svg>",
          contextText: "Figure 2.1 represents a circular conducting wire loop in a time-varying perpendicular B-field, highlighting induced current I."
        };
      }

      if (newCard) {
        setCards(prev => [newCard, ...prev]);
        setSelectedCardId(newCard.id);
      }
    }
  };

  const handleCardDelete = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
    if (selectedCardId === id) {
      setSelectedCardId(null);
    }
  };

  const handleChatSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const userMessageText = inputText;
    const selectedCard = cards.find(c => c.id === selectedCardId);

    const newUserMsg = {
      id: "msg_" + Date.now(),
      role: "user",
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString(),
      refCard: selectedCard
    };

    setChat(prev => [...prev, newUserMsg]);
    setInputText("");
    setIsSending(true);

    try {
      // Call Backend Q&A Chat API
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessageText,
          history: chat.map(m => ({ role: m.role, text: m.text })),
          context: selectedCard ? {
            label: selectedCard.label,
            text: selectedCard.contextText,
            image: selectedCard.imageUrl
          } : null
        })
      });

      if (!resp.ok) throw new Error("Q&A request failed");
      const data = await resp.json();

      setChat(prev => [...prev, {
        id: "msg_reply_" + Date.now(),
        role: "assistant",
        text: data.reply || "I encountered an issue generating a response.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (err) {
      setChat(prev => [...prev, {
        id: "msg_err_" + Date.now(),
        role: "assistant",
        text: "Error: Failed to connect to Gemini API. Please make sure the backend is active.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit();
    }
  };

  const selectedCard = cards.find(c => c.id === selectedCardId);

  return (
    <div className="app-container">
      {/* Header Region */}
      <header className="app-header">
        <div className="header-left">
          <span className="brand-mark">
            <AuraRing size={16} />
            <span style={{ marginLeft: "8px", textTransform: "lowercase", fontSize: "14px" }}>aura<span className="brand-dot">.</span></span>
          </span>
        </div>
        
        <div className="header-center">
          <span className="doc-title" title="Electromagnetic Theory & Maxwell's Equations.pdf">
            Electromagnetic Theory & Maxwell's Equations.pdf
          </span>
          <div className="zoom-controls">
            <button className="zoom-btn" title="Zoom Out"><Icon name="zoomOut" size={10} /></button>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>100%</span>
            <button className="zoom-btn" title="Zoom In"><Icon name="zoomIn" size={10} /></button>
          </div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}>Page {activePage} of 2</span>
        </div>

        <div className="header-right">
          <button className="btn-header" onClick={() => setActivePage(p => p === 1 ? 2 : 1)}>
            {activePage === 1 ? "Next Page" : "Prev Page"}
          </button>
          <button className="btn-header">Export</button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="app-main">
        {/* Left Pane: PDF Canvas */}
        <section className="pane-pdf">
          <div className="pane-title">document viewer · draw boxes to crop</div>
          <div className="pdf-container">
            <div 
              className="pdf-page-wrapper"
              ref={pageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Render simulated page content */}
              {SAMPLE_PAGES[activePage].content}

              {/* Selection overlay canvas */}
              <div className="pdf-selection-overlay" />

              {/* Drag Preview */}
              {isDrawing && dragStart && dragCurrent && (
                <div 
                  className="box-drag-preview"
                  style={{
                    left: Math.min(dragStart.x, dragCurrent.x) + "px",
                    top: Math.min(dragStart.y, dragCurrent.y) + "px",
                    width: Math.abs(dragStart.x - dragCurrent.x) + "px",
                    height: Math.abs(dragStart.y - dragCurrent.y) + "px"
                  }}
                />
              )}

              {/* Render active cards bounding overlays */}
              {cards.filter(c => c.pageNumber === activePage).map(c => {
                // Hardcoded locations for bounding boxes corresponding to content blocks
                let style = {};
                if (c.label.includes("gauss divergence")) {
                  style = { left: "55px", top: "220px", width: "590px", height: "70px" };
                } else if (c.label.includes("electric flux")) {
                  style = { left: "55px", top: "450px", width: "590px", height: "190px" };
                } else if (c.label.includes("faraday curl")) {
                  style = { left: "55px", top: "80px", width: "590px", height: "70px" };
                } else if (c.label.includes("induction loop")) {
                  style = { left: "55px", top: "305px", width: "590px", height: "190px" };
                }
                return (
                  <div 
                    key={c.id}
                    className={`bounding-box ${c.id === selectedCardId ? "active" : ""}`}
                    style={style}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCardId(c.id);
                    }}
                  >
                    <span className="bounding-box-label">{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Middle Pane: Visual Extraction Gallery */}
        <section className="pane-gallery">
          <div className="pane-title">extracted visuals ({cards.length})</div>
          <div className="scrollable-content">
            {cards.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-icon"><Icon name="crop" size={24} /></span>
                <span className="empty-state-title">no extractions</span>
                <p className="empty-state-desc">draw boxes over math or diagrams to extract them here.</p>
              </div>
            ) : (
              <div className="gallery-list">
                {cards.map(c => (
                  <ExtractedCard 
                    key={c.id}
                    card={c}
                    isActive={c.id === selectedCardId}
                    onClick={() => setSelectedCardId(c.id)}
                    onDelete={handleCardDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Q&A Chat */}
        <section className="pane-chat">
          <div className="pane-title">physics assistant</div>
          <div className="chat-messages">
            {chat.map(m => (
              <div key={m.id} className={`chat-message ${m.role}`}>
                <div className="chat-bubble">
                  {m.refCard && (
                    <div className="chat-ref-badge" onClick={() => setSelectedCardId(m.refCard.id)}>
                      <img src={m.refCard.imageUrl} alt="ref" className="chat-ref-preview" />
                      <span>{m.refCard.label}</span>
                    </div>
                  )}
                  <div style={{ marginTop: m.refCard ? '6px' : '0' }}>{m.text}</div>
                </div>
                <div className="chat-meta">{m.role === 'user' ? 'student' : 'assistant'} · {m.timestamp}</div>
              </div>
            ))}
            {isSending && (
              <div className="chat-message assistant">
                <div className="chat-bubble" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" />
                  <span>thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Input Area */}
          <div className="chat-input-container">
            <form onSubmit={handleChatSubmit} className="chat-input-wrapper">
              <textarea 
                className="chat-input-textarea"
                placeholder={selectedCard ? `ask about ${selectedCard.label}...` : "ask about this paper..."}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="2"
              />
              <div className="chat-input-footer">
                <div className="selected-ref-indicator">
                  {selectedCard ? (
                    <>
                      <Icon name="crop" size={12} />
                      <span style={{ fontWeight: '500' }}>{selectedCard.label} selected</span>
                      <button type="button" className="clear-ref-btn" onClick={() => setSelectedCardId(null)} title="Clear selection">
                        <Icon name="close" size={10} />
                      </button>
                    </>
                  ) : (
                    <span>no active selection</span>
                  )}
                </div>
                <button 
                  type="submit" 
                  className="chat-submit-btn"
                  disabled={!inputText.trim() || isSending}
                >
                  Ask
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

// Mount the App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log('%c◐ quietly forged at saiteja.ai', 'color:#F7F3E8;font-family:monospace;letter-spacing:.15em');
