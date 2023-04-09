import {Component} from "react";
import image from "./rat.jpg"
import "./Produtos.css"
export default class Produtos extends Component {
    render() {
        return (
            <div className="main-div">
                <h1 className="title">Produtos</h1>
                <img src={image} alt="Imagem"/>
            </div>
        );
    }
}
