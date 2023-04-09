import './App.css';
import Header from "./Componentes/Header/Header";
import Home from "./Componentes/Home/Home";
import Servicos from "./Componentes/Servicos/Servicos";
import Produtos from "./Componentes/Produtos/Produtos";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./Componentes/Footer/Footer";
import Cadastro from "./Componentes/Cadastro/Cadastro";

// import dog_image from "../public/images/dog.webp"

function App() {
    return (
        <div className="App">
            <Header name="Pet Feliz"/>
            <div className="content">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/produtos" element={<Produtos/>}/>
                        <Route path="/servicos" element={<Servicos/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
