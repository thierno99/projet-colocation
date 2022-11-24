import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";

const Navigation = () => {
    return (
        <nav>
            <ul className="flex row">
                <li className="px-half flex center text-center pointer">
                    <RiLoginCircleFill/>
                    <span className="px-px">
                        connexion
                    </span>
                </li>
                <li>
                    |
                </li>

                <li className="px-half flex center text-center pointer">
                    <FaSignInAlt/>
                    <span className="px-px">
                        Inscription
                    </span>
                </li>
            </ul>

        </nav>
    );
}

const Header = () => {
    return(
        <div className="text-light p-1">
            <div className="flex row space-between">
                {/* <div className="logo pointer">
                    ColocNow
                </div> */}

                <h1 className="pointer">Coloc-me-now</h1>

                <Navigation/>

            </div>
        </div>
    );
}

export default Header;