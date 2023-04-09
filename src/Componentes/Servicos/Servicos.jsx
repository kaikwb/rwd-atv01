import {useState} from "react";
import image from "./cat.jpg"
import "./Servicos.css"

export default function Servicos() {
    const [count, setCount] = useState(0);

    return (
        <div className="main-div">
            <h1 className="title">Serviços</h1>
            <img src={image} alt="Imagem"/>
            <p>Quatidade de cachorros que tomaram banho: {count}</p>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
        </div>
    );
}
