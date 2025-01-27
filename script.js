import React, { useState } from "react";
import { motion } from "framer-motion";

const products = [
  { 
    id: 1, 
    name: "Banner", 
    price: 50.00, 
    description: "Banners personalizados de alta qualidade.", 
    image: "https://via.placeholder.com/300x200?text=Banner" 
  },
  { 
    id: 2, 
    name: "Cartão de Visita", 
    price: 30.00, 
    description: "Design moderno para cartões de visita.", 
    image: "https://via.placeholder.com/300x200?text=Cart%C3%A3o+de+Visita" 
  },
  { 
    id: 3, 
    name: "Adesivos", 
    price: 20.00, 
    description: "Adesivos criativos e personalizados.", 
    image: "https://via.placeholder.com/300x200?text=Adesivos" 
  },
];

const banners = [
  "https://via.placeholder.com/1200x400?text=Design+Gr%C3%A1fico+1",
  "https://via.placeholder.com/1200x400?text=Design+Gr%C3%A1fico+2",
  "https://via.placeholder.com/1200x400?text=Design+Gr%C3%A1fico+3",
];

function handleCheckout(product) {
  fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer SEU_ACCESS_TOKEN",
    },
    body: JSON.stringify({
      items: [
        {
          title: product.name,
          description: product.description,
          quantity: 1,
          currency_id: "BRL",
          unit_price: product.price,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.open(data.init_point, "_blank");
    })
    .catch((error) => console.error("Erro ao criar preferência: ", error));
}

function SuccessPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px", backgroundColor: "black", color: "white" }}>
      <h1>AGRADECEMOS POR SUA COMPRA!</h1>
      <p>ATÉ A PRÓXIMA!</p>
    </div>
  );
}

function FailurePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px", backgroundColor: "black", color: "white" }}>
      <h1>SEU PAGAMENTO FALHOU</h1>
      <p>TENTE NOVAMENTE.</p>
    </div>
  );
}

function BannerSlider() {
  const [currentBanner, setCurrentBanner] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="banner-slider" 
      style={{ position: "relative", height: "400px", overflow: "hidden" }}
    >
      {banners.map((banner, index) => (
        <motion.img
          key={index}
          src={banner}
          alt={`Banner ${index + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: currentBanner === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function EuzebioStore() {
  const [view, setView] = useState("store");

  if (view === "success") return <SuccessPage />;
  if (view === "failure") return <FailurePage />;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", padding: "20px 0", backgroundColor: "#1a1a1a" }}>
        <img 
          src="/mnt/data/LOGOTIPO---EUZÉBIO-VISUAL-ART-.jpg" 
          alt="Euzébio Visual Art Logo" 
          style={{ height: "80px", objectFit: "contain" }}
        />
        <p>Modernidade e sofisticação em produtos gráficos</p>
      </header>

      <BannerSlider />

      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2em", margin: "20px 0" }}>Nossos Produtos</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {products.map((product) => (
            <div key={product.id} style={{ backgroundColor: "white", color: "black", borderRadius: "15px", overflow: "hidden", padding: "15px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h2 style={{ fontSize: "1.5em", margin: "15px 0" }}>{product.name}</h2>
              <p>{product.description}</p>
              <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>R${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleCheckout(product)}
                style={{ marginTop: "15px", backgroundColor: "black", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "20px 0", backgroundColor: "#1a1a1a" }}>
        <p>© 2025 Euzébio Visual Art. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
