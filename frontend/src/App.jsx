import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from "./views/Home";
import Usuarios from "./views/Usuarios";
import TipoComida from "./views/TipoComida";
import Cobros from "./views/Cobros";
import Cuentas from "./views/Cuentas";
import TipoCobros from "./views/TipoCobros";
import Registros from "./views/Registro";
import Footer from "./components/Footer";



function App() {
    return (
        <BrowserRouter>

        <div className="d-flex flex-column min-vh-100">
             <Header />

            <main className="container mt-4 flex-grow-1">
                <Routes>
                    <Route path="/Comida" element={<TipoComida />}/>
                    <Route path="/" element={<Home />} />
                    <Route path="/Usuarios" element={<Usuarios />} />
                    <Route path="/Cuentas" element={<Cuentas />}/>
                    <Route path="TipoCobros" element={<TipoCobros />}/>
                    <Route path="/Registros" element={<Registros />}/>
                    <Route path="/Cobros" element={<Cobros />}/>
                </Routes>

            </main>

            <Footer />
        </div>
           
        </BrowserRouter>
    );
}

export default App;
