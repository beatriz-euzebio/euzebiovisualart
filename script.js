import React from "react";
import { useState } from "react";

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

export default function EuzebioStore() {
  const [view, setView] = useState("store");

  if (view === "success") return <SuccessPage />;
  if (view === "failure") return <FailurePage />;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "black", color: "white", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5em" }}>Euzébio Visual Art</h1>
        <p>Modernidade e sofisticação em produtos gráficos</p>
      </header>

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

      <footer style={{ textAlign: "center", marginTop: "30px" }}>
        <p>© 2025 Euzébio Visual Art. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
