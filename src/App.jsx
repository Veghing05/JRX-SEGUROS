import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from 'react-bootstrap/Carousel';
import PoliticaPrivacidade from './PoliticaPrivacidade';
import { SiTryhackme } from 'react-icons/si';


function Home() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/email';
    
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus({ type: "success", message: "Mensagem enviada com sucesso!" });
        setFormData({ nome: '', email: '', mensagem: '' });
      } else {
        setStatus({ type: "danger", message: "Erro ao enviar mensagem." });
      }
    } catch (error) {
      console.error("Erro:", error);
      setStatus({ type: "danger", message: "Erro ao enviar mensagem." });
    }
  
    setLoading(false);
  };
  

  const whatsappLink = "https://wa.me/5511976056081?text=Ol%C3%A1!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Helmet>
        <title>JRX Corretora de Seguros</title>
        <meta name="description" content="Corretora de seguros confiável com planos personalizados." />
        <meta name="keywords" content="seguros, corretora, seguro auto, seguro vida, seguro empresarial" />
        <meta property="og:title" content="JRX Corretora de Seguros" />
        <meta property="og:description" content="Corretora de seguros confiável com planos personalizados." />
        <meta property="og:image" content="./assets/logo1.jpeg" />
      </Helmet>

      <a 
        href={whatsappLink} 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Fale conosco via WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/assets/Logo1.jpeg" alt="Logo JRX" height="60" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#servicos">Serviços</a></li>
              <li className="nav-item"><a className="nav-link" href="#sobre">Sobre</a></li>
              <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Proteção e Confiança com a JRX Seguros</h1>
          <p className="lead">Planos personalizados para você, sua família ou empresa.</p>
          <a href="#contato" className="btn btn-light btn-lg mt-3">Fale Conosco</a>
        </div>
      </header>

      <section className="py-4">
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src="/assets/auto.jpg" alt="Slide 1" />
              <Carousel.Caption><h5>Confiança e Segurança</h5></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="/assets/foto1.jpeg" alt="Slide 2" />
              <Carousel.Caption><h5>Planos sob medida</h5></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>

      <section id="servicos" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Nossos Serviços</h2>
          <div className="row">
            {[{ titulo: "Seguro Auto", descricao: "Garanta proteção total para o seu veículo com cobertura completa e assistência 24h." },
              { titulo: "Seguro Vida", descricao: "Tranquilidade e segurança para você e sua família em todos os momentos." },
              { titulo: "Seguro Empresarial", descricao: "Proteja o patrimônio do seu negócio com soluções personalizadas." },
            { titulo: "Planos Odontológicos", descricao: "Cuide do seu sorriso com planos acessíveis e ampla cobertura." },
            {titulo: "Plano de Saúde", descricao: "Tenha acesso à saúde de qualidade para você e sua família." },
            ].map((servico, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{servico.titulo}</h5>
                    <p className="card-text">{servico.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Sobre a JRX</h2>
          <p className="mx-auto" style={{ maxWidth: "700px" }}>
            Com anos de experiência no mercado, oferecemos soluções de seguros personalizadas. Nosso compromisso é com a sua segurança e satisfação.
          </p>
        </div>
      </section>

      <section id="contato" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Fale Conosco</h2>
          <form className="mx-auto col-md-8 col-lg-6" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="nome" placeholder="Nome" className="form-control" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <textarea name="mensagem" placeholder="Mensagem" className="form-control" rows="5" value={formData.mensagem} onChange={handleChange} required />
            </div>
            {status.message && (
              <div className={`alert alert-${status.type}`} role="alert">{status.message}</div>
            )}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Enviando...</> : 'Enviar'}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-primary text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} JRX Corretora de Seguros. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="text-white text-decoration-underline">Política de Privacidade</Link>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      </Routes>
    </Router>
  );
}

export default App;
