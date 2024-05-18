const WelcomePageContent = () => (
  <>
    <div className="welcome-page">
      <div className="welcome-page-container">
        <div className="welcome-page-container__title">let`s get started</div>
        <div className="welcome-page-container__description">Notebook 1.1</div>
      </div>

      <div className="welcome-page__button">
        <div className="welcome-page__button--title">Begin</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="welcome-page__button--icon">
          <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19">
          </polyline>
        </svg>
      </div>
    </div>
  </>
);

export default WelcomePageContent;