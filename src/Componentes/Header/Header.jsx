import React, {Component} from "react";
import logo from "./logo.png";
import "./Header.css"
import Menu from "../Menu/Menu";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="logo-container">
                    <img className="logo" src={logo} alt="Logo"/>
                    <h1 className="header-name">{this.props.name}</h1>
                </div>
                <Menu/>
            </header>
        );
    }
}
