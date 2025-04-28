import { X } from "lucide-react"
import { useLayoutContext } from "../contexts/LayoutContext"
import fetchSites from "../services/fetchSites"
import { Site } from "../models/site"

function AddModal() {
  const { setIsAddModalOpen, currentSite, setCurrentSite, setSites } = useLayoutContext()

  const addSite = async (site: Site) => {
    try {
      // Remover o campo `id` e `created_at` antes de enviar
      const { id, created_at, ...siteWithoutIdAndCreatedAt } = site;
  
      console.log('Adicionando site:', siteWithoutIdAndCreatedAt);
      
      // Enviar os dados sem o id e created_at
      const response = await fetch('http://localhost:8002/sites/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteWithoutIdAndCreatedAt),
      });

      fetchSites(setSites);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Novo site adicionado:', data);
  
    } catch (error) {
      console.error('Erro ao adicionar o site:', error);
    }
  };
  
  



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentSite) {
      addSite(currentSite)  // Chama a função de adicionar site
      setIsAddModalOpen(false) // Fecha o modal após o envio
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Adicionar Novo Site</h3>
          <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="siteUrl" className="block text-sm font-medium mb-1">URL do Site</label>
            <input
              type="url"
              id="siteUrl"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              placeholder="https://exemplo.com"
              value={currentSite?.url || ''}
              onChange={(e) => setCurrentSite({ ...currentSite, url: e.target.value })}
              required
            />
          </div>

       

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Adicionar Site
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModal
