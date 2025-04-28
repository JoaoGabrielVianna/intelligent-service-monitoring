import React, { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Globe, CheckCircle, AlertTriangle, Plus, Edit, Trash2, X } from 'lucide-react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { useLayoutContext } from './contexts/LayoutContext';
import AddModal from './components/addModal';
import EditModal from './components/editModel';
import fetchSites from './services/fetchSites';
import DeleteModal from './components/deleteModal';
import SiteLogs from './screens/siteLogs';
import Dashboard from './components/dashboard';

const SiteMonitor: React.FC = () => {
  const {
    setSites,
    setTheme,
    theme,
    sites,
    handleAddSite,
    handleEditSite,
    handleDeleteSite,
    currentSite,
    isDeleteModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    isLogsSectionVisible,
    selectedSiteLogs,
    hideSiteLogs,
    showSiteLogs
  } = useLayoutContext();

  // Set theme based on user preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Testar API
  useEffect(() => {
    fetchSites(setSites); // Passando setSites como argumento
  }, [setSites]);

  // Restaurar posição do scroll ao carregar
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  // Salvar posição do scroll quando o usuário rolar
  const handleScroll = () => {
    localStorage.setItem('scrollPosition', window.scrollY.toString());
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={` min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto p-4 md:p-6 flex-grow overflow-y-hidden">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Monitoramento de Sites</h1>
          <p className="text-gray-600 dark:text-gray-400">Acompanhe o status e tempo de resposta dos sites monitorados</p>
        </header>

        {/* Estatísticas Rápidas */}
        <Dashboard />

        {/* Sites Cadastrados */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sites Cadastrados</h2>
            <button onClick={handleAddSite} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Site
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-sm font-semibold">URL</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold"></th>
                    <th className="px-6 py-3 text-left text-sm font-semibold"></th>
                    <th className="px-6 py-3 text-left text-sm font-semibold"></th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site) => (
                    <tr key={site.url} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="text-blue-500 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            showSiteLogs(site);
                          }}
                        >
                          {site.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400"></td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full`}>
                          
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm"></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEditSite(site.url)} className="text-blue-500 hover:text-blue-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteSite(site)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isLogsSectionVisible && selectedSiteLogs && (
          <SiteLogs />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Add/Edit Modal */}
      {isAddModalOpen && currentSite && (
        <AddModal />
      )}

      {isEditModalOpen && (
        <EditModal />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteModal />
      )}
    </div>
  );
};

export default SiteMonitor;
