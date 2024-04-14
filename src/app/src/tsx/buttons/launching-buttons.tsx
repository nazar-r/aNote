import { useState } from "react";
import { checkingEmailSyntax, checkingPassSyntax } from "../extentions/syntax-check";

const RenderingButtons = () => {
  const [clicked, initial] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const launchingButton = (index: number) => { initial(index); setError(""); };

  const handleSubmit = () => {
    if (!checkingEmailSyntax(email)) { setError("Incorrect Email!"); return; }
    if (!checkingPassSyntax(password)) { setError("Пароль повинен містити мінімум 8 символів, букви та цифри"); return; }
    setError(""); alert("Email і пароль валідні! Можна відправляти форму");
  };

  const buttons = ["Log in", "Sign in"];

  return (
    <div className="login-page__button-container">
      {buttons.map((label, index) => (
        <div key={index} className="login-page__button">
          <div onClick={() => { launchingButton(index); handleSubmit(); }} className="login-page__button--title">
            <p className="login-page__button--title-text">{label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </div>
          {clicked === index && (
            <div className="login-page__button--text-input">
              <textarea className="login-page__button--text-item" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></textarea>
              <textarea className="login-page__button--text-item" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></textarea>
              {error && <p className="login-page__button--error" style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderingButtons;