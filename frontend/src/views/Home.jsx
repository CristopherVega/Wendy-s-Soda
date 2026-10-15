import Carousel from 'react-bootstrap/Carousel';
import logo from '../assets/Wendy\'s_Logo2.png';

function Home() {
    return (
        <>
            <div className='introduccion'>
                <h1 className="text-center my-5">Wendy's Postres y Comida</h1>


                <p className="text-center mb-5">Bienvenidos a nuestra pagina de una emprendedora que ofrece distintos servicios
                    como los cuales son Soda , servicio de catherin service , postres y cotizaciones esta pagina se encarga de llevar un control bastante amplio
                    y seguro en la Soda permitiendo a la dueña llevar un control econimico de todo lo que consumen las personas en su soda </p>
            </div>

            <div className="carousel-pantalla">
                <h2 className="text-center mb-5">Nuestras mejores creaciones</h2>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-imagen"
                            src={logo}
                            alt="Tres leches"
                        />
                        <Carousel.Caption>
                            <h3>Tres Leches</h3>
                            <p>Proba nuestro delicioso tres leches con su receta secreta </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100  carousel-imagen"
                            src={logo}
                            alt="Tres leches"
                        />
                        <Carousel.Caption>
                            <h3>Tres Leches 2</h3>
                            <p>Proba nuestro delicioso tres leches con su receta secreta </p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-imagen"
                            src={logo}
                            alt="Tres leches"
                        />
                        <Carousel.Caption>
                            <h3>Tres Leches</h3>
                            <p>Proba nuestro delicioso tres leches con su receta secreta </p>
                        </Carousel.Caption>
                    </Carousel.Item>


                </Carousel>
            </div>

            <section className="ubicacion-section py-5">
                <div className="container">
                    <h2 className="ubicacion-titulo text-center mb-4 fs-1fw-bold">
                        ¿Dónde estamos ubicados?
                    </h2>

                    <div className="ubicacion-card row g-0 shadow-lg rounded-4 overflow-hidden my-4">
                 
                        <div className="col-lg-5 ubicacion-info p-4 p-md-5 d-flex flex-column justify-content-center bg-white">
                            <h3 className="fw-bold mb-3" style={{ color: 'var(--color-secondary)' }}>
                                ¡Visítanos!
                            </h3>
                            <p className="text-muted mb-4 fs-6">
                                Ven a conocer nuestras instalaciones. Estamos ubicados en un punto de fácil acceso para ti.
                            </p>

                            <div className="d-flex align-items-start mb-3">
                                <div className="info-icon me-3 p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--background)', width: '40px', height: '40px' }}>
                                    
                                </div>
                                <div>
                                    <strong className="d-block text-dark">Dirección</strong>
                                    <span className="text-muted small">Arrocera Costa Rica, Liberia, Guanacaste</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-start mb-4">
                                <div className="info-icon me-3 p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--background)', width: '40px', height: '40px' }}>
                                    
                                </div>
                                <div>
                                    <strong className="d-block text-dark">Horario de atención</strong>
                                    <span className="text-muted small">Lunes a Sábado: 8:00 AM - 5:00 PM</span>
                                </div>
                            </div>

                            <a
                                href="https://maps.google.com/?q=Arrocera+Costa+Rica"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary-custom w-100 py-2 fw-semibold text-decoration-none text-center"
                            >
                                Abrir en Google Maps
                            </a>
                        </div>

                   
                        <div className="col-lg-7 mapa-container position-relative">
                            <iframe
                                className="w-100 h-100 border-0"
                                style={{ minHeight: '380px' }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.412011138129!2d-85.45325972519738!3d10.625065489514613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f757d24344852c3%3A0x81a91ac3011d9a9c!2sArrocera%20Costa%20Rica!5e0!3m2!1ses!2scr!4v1789787866901!5m2!1ses!2scr"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Arrocera Costa Rica"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home;