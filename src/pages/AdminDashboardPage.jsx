// src/pages/AdminDashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProperties, addProperty, updateProperty, deleteProperty } from '../services/propertyService';
import PropertyForm from '../components/admin/PropertyForm'; // Criaremos a seguir
import PropertyList from '../components/admin/PropertyList'; // E este também
import PageWrapper from '../components/PageWrapper';

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null); // Guarda o imóvel em edição
  const [loading, setLoading] = useState(true);

  // Função para carregar os imóveis do Firestore
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const propertiesData = await getProperties();
      setProperties(propertiesData);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    }
    setLoading(false);
  };

  // Carrega os imóveis quando o componente é montado
  useEffect(() => {
    fetchProperties();
  }, []);

  // Função para lidar com o envio do formulário (Criação e Atualização)
  const handleFormSubmit = async (formData) => {
    try {
      if (editingProperty) {
        // Atualizar
        await updateProperty(editingProperty.id, formData);
        alert('Imóvel atualizado com sucesso!');
      } else {
        // Criar
        await addProperty({ ...formData, ownerId: currentUser.uid });
        alert('Imóvel adicionado com sucesso!');
      }
      setEditingProperty(null); // Limpa o formulário
      fetchProperties(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      alert('Ocorreu um erro ao salvar o imóvel.');
    }
  };

  // Define o imóvel a ser editado
  const handleEdit = (property) => {
    setEditingProperty(property);
    window.scrollTo(0, 0); // Rola para o topo para ver o formulário
  };

  // Cancela a edição
  const handleCancelEdit = () => {
    setEditingProperty(null);
  };

  // Lida com a exclusão de um imóvel
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      try {
        await deleteProperty(id);
        alert('Imóvel excluído com sucesso!');
        fetchProperties(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir imóvel:", error);
        alert('Ocorreu um erro ao excluir o imóvel.');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-primary mb-6">Gestão de Imóveis</h1>

        {/* Formulário de Adição/Edição */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {editingProperty ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
          </h2>
          <PropertyForm
            onSubmit={handleFormSubmit}
            initialData={editingProperty}
            onCancel={handleCancelEdit}
          />
        </div>

        {/* Lista de Imóveis */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Imóveis Cadastrados</h2>
          {loading ? (
            <p>Carregando imóveis...</p>
          ) : (
            <PropertyList
              properties={properties}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboardPage;