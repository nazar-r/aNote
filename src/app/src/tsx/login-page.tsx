import LaunchButton from "./buttons/launching-buttons";

const LoginPageContent = () => (
    <div className="login-page">
        <div className="login-page__title">Welcome Back!</div>
        <div className="login-page__button-container">
            <div onClick={LaunchButton} className="login-page__button">
                <p>Log in</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></div>
            <div onClick={LaunchButton} className="login-page__button">
                <p>Sign in</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="login-page__button--icon"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
        </div>
    </div>
);

export default LoginPageContent;