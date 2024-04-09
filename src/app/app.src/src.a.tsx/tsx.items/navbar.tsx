import { useState } from "react"


const Navbar = () => {
    const [defNavbar, setNavbar] = useState(false);

    return (
        <div>
            {defNavbar && (
                <div className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-item">Home</div>
                        <div className="navbar-item">Lobby</div>
                        <div className="navbar-item">Settings</div>
                    </div>
                </div>
            )}
            <div className="navbar-button" onClick={() => setNavbar(prev => !prev)}>Menu</div>
        </div>
    );
};

export default Navbar;