import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/home.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,region,flags");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = selectedRegion === "All"
    ? countries
    : countries.filter(country => country.region === selectedRegion);

  const loadMoreCountries = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % countries.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + countries.length) % countries.length);
  };

  return (
    <div className="container mt-3">
      <div className="header-section text-center">
        <h2 className="fw-bold mt-2">Countries</h2>
        <Navbar expand="lg" className="mb-3">
          <Container>
            <Navbar.Toggle aria-controls="filter-navbar" />
            <Navbar.Collapse id="filter-navbar">
              <Nav className="mx-auto">
                {["All", "Asia", "Europe"].map(region => (
                  <button key={region} 
                    className={`btn btn-link mx-3 ${selectedRegion === region ? "active-filter" : ""}`} 
                    onClick={() => setSelectedRegion(region)}>
                    {region}
                  </button>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="position-relative text-center my-4 d-flex align-items-center justify-content-center web-welcome-text">
        <hr className="flex-grow-1 me-2 welcome-line1" />
        <h2 className="fw-bold">WELCOME</h2>
        <hr className="flex-grow-1 ms-2 welcome-line2" />
      </div>

      <div className="text-center my-4 welcome-mob">
        <h2 className="fw-bold">WELCOME</h2>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {countries.length > 0 && (
        <div className="d-flex gap-3 my-4 image-container-mob">
          <div className="image-slider-container position-relative" style={{ width: "807px", height: "498px", border: "1.5px solid black" }}>
            <img src={countries[currentImage].flags.png} alt="Country Flag" className="img-container1" style={{ objectFit: "contain",width:"100%" }} />
            <div className="slider-controls position-absolute  translate-middle d-flex align-items-center p-2">
              <button className="btn slider-arrow" onClick={prevImage}><FaArrowLeft /></button>
              {countries.slice(0, Math.min(4, countries.length)).map((_, index) => (
                <span
                  key={index}
                  className={`dot mx-1 ${currentImage === index ? "active-dot" : ""}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
              <button className="btn ms-2 slider-arrow" onClick={nextImage}><FaArrowRight /></button>
            </div>
          </div>
          <div className="image-slider-container rounded" style={{ width: "20%", height: "498px", border: "1.5px solid black" }}>
            <img src={countries[(currentImage + 1) % countries.length].flags.png} alt="Country Flag" className="img-container2" style={{ objectFit: "cover" }} />
          </div>
        </div>
      )}

      <div className="row">
        {!loading && filteredCountries.slice(0, visibleCount).map((country, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card-container p-3 shadow-sm d-flex align-items-center">
              <div className="me-3 bg-light rounded">
                <img src={country.flags.png} alt={`${country.name.common} flag`}  style={{ width: "50px", height: "50px", objectFit: "cover" }} />
              </div>
              <div>
                <h6 className="mb-0">{country.name.common}</h6>
                <p className="text-muted small">{country.region}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredCountries.length > visibleCount && (
        <div className="text-center my-4">
          <button className="btn btn-dark text-white" onClick={loadMoreCountries}>Load More</button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-5 p-3">
        <p>Contact: <a href="mailto:example@email.com" className="text-dark fw-bold">example@email.com</a></p>
        <div className="d-flex justify-content-center gap-3 my-2">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} className="text-primary" /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} className="text-info" /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} className="text-primary" /></a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={30} className="text-danger" /></a>
        </div>
        <p className="copy-right">&copy; 2024 Countries App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
