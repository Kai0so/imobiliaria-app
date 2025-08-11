// src/components/admin/PropertyForm.jsx

import React, { useState, useEffect } from 'react';

const initialState = {
  title: '',
  description: '',
  price: '',
  type: 'Apartamento',
  status: 'Venda',
  location: '',
  beds: '',
  baths: '',
  area: '',
  images: ['https://via.placeholder.com/600x400.png?text=Imagem+1'] // URL de imagem placeholder
};

const PropertyForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialState);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converte campos numéricos
    const parsedValue = ['price', 'beds', 'baths', 'area'].includes(name) ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState); // Limpa o form após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      {/* Linha 1: Título e Localização */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Título do Imóvel" className="p-2 border rounded w-full" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Localização (Cidade, UF)" className="p-2 border rounded w-full" required />
      </div>

      {/* Descrição */}
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descrição completa do imóvel" className="p-2 border rounded w-full" rows="4"></textarea>

      {/* Linha 3: Tipo, Status e Preço */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select name="type" value={formData.type} onChange={handleChange} className="p-2 border rounded w-full">
          <option>Apartamento</option>
          <option>Casa</option>
          <option>Terreno</option>
          <option>Comercial</option>
        </select>
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded w-full">
          <option>Venda</option>
          <option>Aluguel</option>
        </select>
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Preço (R$)" className="p-2 border rounded w-full" required />
      </div>

      {/* Linha 4: Quartos, Banheiros e Área */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" name="beds" value={formData.beds} onChange={handleChange} placeholder="Quartos" className="p-2 border rounded w-full" />
        <input type="number" name="baths" value={formData.baths} onChange={handleChange} placeholder="Banheiros" className="p-2 border rounded w-full" />
        <input type="number" name="area" value={formData.area} onChange={handleChange} placeholder="Área (m²)" className="p-2 border rounded w-full" />
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4">
        {isEditing && (
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
            Cancelar Edição
          </button>
        )}
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-800">
          {isEditing ? 'Atualizar Imóvel' : 'Adicionar Imóvel'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;