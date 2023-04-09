import {Component} from "react";
import image from "./dog.webp"
import "./Home.css"
export default class Home extends Component {
    render() {
        return (
            <div className="main-div">
                <h1 className="title">Home</h1>
                <img src={image} alt="Imagem"/>
            </div>
        );
    }
}
