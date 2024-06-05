import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authFetching from "./extensions/fetching";

const RenderingButtons = () => {
  const [buttonIndex, setButtonIndex] = useState<number | null>(null);
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingTitle, setLoadingTitle] = useState(false);

  const navigate = useNavigate();
  const buttons = ["Log in", "Sign up"];
  const callCountRef = useRef(0);

  const onClickButton = async (num: number) => {
    callCountRef.current += 1;
    setButtonIndex(num);
    setLoadingTitle(true);
    const buttonMode = num === 0 ? "login" : "register";

    if (callCountRef.current > 1) {
      const fetchImport = await authFetching({ email, password, buttonMode });
      fetchImport.error
        ? setError(fetchImport.error)
        : fetchImport.token &&
        (localStorage.setItem("token", fetchImport.token), navigate("/lobby"));
    }

    setLoadingTitle(false);
    console.log(buttonMode);
  };

  return (
    <div className="login-page__button-container">
      {buttons.map((titleItem, index) => (
        <div key={index} className="login-page__button">
          <div className="login-page__button--title" onClick={() => onClickButton(index)}>
            <p className="login-page__button--title-text">{titleItem}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </div>

          {buttonIndex === index ? (
            <div className="login-page__button--text-input">
              <input className="login-page__button--text-item" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              {error.emailError ? <p className="login-page__button--error">{error.emailError}</p> : null}
              <input className="login-page__button--text-item" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              {error.passwordError ? <p className="login-page__button--error">{error.passwordError}</p> : null}
              {loadingTitle ? <p className="login-page__button--error">Loading...</p> : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default RenderingButtons;