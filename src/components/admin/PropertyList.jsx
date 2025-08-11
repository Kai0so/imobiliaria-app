// src/components/admin/PropertyList.jsx

import React from 'react';

const PropertyList = ({ properties, onEdit, onDelete }) => {
  const formatPrice = (price) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  if (properties.length === 0) {
    return <p>Nenhum imóvel cadastrado ainda.</p>;
  }

  return (
    <div className="overflow-x-auto tex">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="text-left py-2 px-4">Título</th>
            <th className="text-left py-2 px-4">Tipo</th>
            <th className="text-left py-2 px-4">Localização</th>
            <th className="text-left py-2 px-4">Preço</th>
            <th className="text-left py-2 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-black">{prop.title}</td>
              <td className="py-2 px-4 text-black">{prop.type}</td>
              <td className="py-2 px-4 text-black">{prop.location}</td>
              <td className="py-2 px-4 text-black">{formatPrice(prop.price)}</td>
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  <button onClick={() => onEdit(prop)} className="text-blue-600 hover:text-blue-800">Editar</button>
                  <button onClick={() => onDelete(prop.id)} className="text-red-600 hover:text-red-800">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;