import React, { useState } from "react";
import { handleSubmit } from "./extensions/handle-submit";

const RenderingButtons: React.FC = () => {
  const [clicked, setClicked] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const launchingButton = (index: number) => {
    setClicked(index);
    setError({ email: "", password: "" });
  };

  const onClickButton = async () => {
    setLoading(true);
    const result = await handleSubmit({ email, password });
    setLoading(false);
    result.error
      ? setError(result.error)
      : result.token && (console.log("Access token:", result.token), localStorage.setItem("token", result.token));
  };

  const buttons = ["Log in", "Sign in"];

  return (
    <div className="login-page__button-container">
      {buttons.map((label, index) => (
        <div key={index} className="login-page__button">
          <div onClick={() => { launchingButton(index); onClickButton(); }} className="login-page__button--title">
            <p className="login-page__button--title-text">{label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          {clicked === index && (
            <div className="login-page__button--text-input">
              <input className="login-page__button--text-item" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              {error.email && <p className="login-page__button--error">{error.email}</p>}
              <input className="login-page__button--text-item" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              {error.password && <p className="login-page__button--error">{error.password}</p>}
              {loading && <p>Loading...</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderingButtons;