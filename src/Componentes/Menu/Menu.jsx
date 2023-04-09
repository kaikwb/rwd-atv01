import React from "react";
import "./Menu.css"

export default function Menu() {
    return (
        <div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/produtos">Produtos</a></li>
                <li><a href="/servicos">Serviços</a></li>
                <li><a href="/cadastro">Cadastro</a></li>
            </ul>
        </div>
    );
}
