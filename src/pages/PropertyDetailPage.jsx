// src/pages/PropertyDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById } from '../services/propertyService';
import { FaBed, FaBath, FaRulerCombined, FaWhatsapp } from 'react-icons/fa';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';

const PropertyDetailPage = () => {
  const { id } = useParams(); // Pega o ID da URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await getPropertyById(id);
        setProperty(propertyData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do imóvel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center p-10">Carregando detalhes do imóvel...</div>;
  }

  if (!property) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl">Imóvel não encontrado.</h2>
        <Link to="/imoveis" className="text-primary hover:underline mt-4 inline-block">
          Voltar para a lista de imóveis
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price);
  const whatsappNumber = "5531999513583"; // SUBSTITUA PELO SEU NÚMERO
  const whatsappMessage = `Olá! Tenho interesse no imóvel "${property.title}" (ID: ${property.id}). Podemos conversar?`;

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10">
        {/* Galeria de Imagens (simples por agora) */}
        <img src={property.images[0]} alt={property.title} className="w-full h-[50vh] object-cover rounded-lg shadow-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna de Informações Principais */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-primary mb-2">{property.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{property.location}</p>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Descrição</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
            </div>
          </div>

          {/* Coluna Lateral (Preço e Contato) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <p className="text-4xl font-bold text-gray-900 mb-4">{formattedPrice}</p>
              <div className="flex flex-wrap gap-4 text-center mb-6">
                <div className="flex-1 p-3 bg-light-gray rounded-lg text-gray-700">
                  <FaBed className="mx-auto text-primary text-2xl mb-1" /> {property.beds} Quartos
                </div>
                <div className="flex-1 p-3 bg-light-gray rounded-lg text-gray-700">
                  <FaBath className="mx-auto text-primary text-2xl mb-1" /> {property.baths} Banheiros
                </div>
                <div className="flex-1 p-3 bg-light-gray rounded-lg text-gray-700">
                  <FaRulerCombined className="mx-auto text-primary text-2xl mb-1" /> {property.area} m²
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="mr-2" /> Falar com Corretor
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PropertyDetailPage;