import fetchingGoogle from "./extensions/fetching.google";
import fetchingGithub from "./extensions/fetching.github";
// import GoogleIcon from "./extensions/assets/google.pic";
// import GithubIcon from "./extensions/assets/github.pic";


const RenderingButtons = () => (
  <div className="login-page__button-container">
    <div key={"google"} className="login-page__button" onClick={() => fetchingGoogle()}>
      <div className="login-page__button--title">
        <div className="login-page__button--title-text">Use Google</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
      </div>
      {/* <GoogleIcon /> */}
    </div>
    <div key={"github"} className="login-page__button" onClick={() => fetchingGithub}>
      <div className="login-page__button--title">
        <div className="login-page__button--title-text">Use Github</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
      </div>
      {/* <GithubIcon /> */}
    </div>
  </div>
)

export default RenderingButtons;