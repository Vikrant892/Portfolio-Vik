import { useState, FormEvent } from "react";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.open(
      `mailto:vikrantsharma892@gmail.com?subject=${subject}&body=${body}`,
      "_self"
    );

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="cta-section">
      <h2 className="cta-heading">GET IN TOUCH</h2>

      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="terminal-title">contact@vikrant ~ %</span>
        </div>

        <form className="terminal-body" onSubmit={handleSubmit}>
          <div className="terminal-row">
            <span className="terminal-prompt">&gt;</span>
            <label className="terminal-label">name:</label>
            <input
              className="terminal-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              required
              data-cursor="disable"
            />
            <span className="terminal-cursor">_</span>
          </div>

          <div className="terminal-row">
            <span className="terminal-prompt">&gt;</span>
            <label className="terminal-label">email:</label>
            <input
              className="terminal-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              data-cursor="disable"
            />
            <span className="terminal-cursor">_</span>
          </div>

          <div className="terminal-row terminal-row-message">
            <span className="terminal-prompt">&gt;</span>
            <label className="terminal-label">message:</label>
            <textarea
              className="terminal-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type your message here..."
              rows={4}
              required
              data-cursor="disable"
            />
            <span className="terminal-cursor">_</span>
          </div>

          <div className="terminal-row terminal-row-submit">
            <button
              type="submit"
              className="terminal-submit"
              data-cursor="disable"
            >
              $ submit --send
            </button>
          </div>

          {sent && (
            <div className="terminal-row terminal-success">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-success-text">
                message_sent: true ✓
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CallToAction;
