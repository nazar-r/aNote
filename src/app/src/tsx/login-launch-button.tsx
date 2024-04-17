import { useRef, useEffect } from "react";
const LaunchButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.classList.add("login-page__button--hovered");
    buttonRef.current?.classList.remove("login-page__button");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        buttonRef.current.classList.remove("login-page__button--hovered");
        buttonRef.current.classList.add("login-page__button");
      }
    };
    document.addEventListener("click", handleClickOutside);
  }, []);
  
  return <button ref={buttonRef} onClick={handleClick} className="login-page__button">Запустити</button>;
};

export default LaunchButton;