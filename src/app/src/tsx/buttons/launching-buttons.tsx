import { createRoot } from 'react-dom/client';

const LaunchButton = (e: React.MouseEvent<HTMLDivElement>) => {
  const rootItem = e.currentTarget;
  rootItem.innerHTML = "";

  const root = createRoot(rootItem);
  root.render(
    <div className="login-page__button--text-input">
      <textarea className="login-page__button--text-item" placeholder="Email"></textarea>
      <textarea className="login-page__button--text-item" placeholder="Password"></textarea>
    </div>
  );
};

export default LaunchButton;