// import { X } from "lucide-react"
// import { useLayoutContext } from "../contexts/LayoutContext"

// function Modal(){
//     const {setIsModalOpen, currentSite, setCurrentSite, handleSubmit, } = useLayoutContext()

//     const updateSiteFetch = async (site: any) => {
//       try {
//           const response = await fetch(`http://localhost:8002/sites/${site.id}`, {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(site),
//           });
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           const data = await response.json();
//           console.log('Site updated:', data);
//       } catch (error) {
//           console.error('Error updating site:', error);
//       }


//     return(
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-bold">{currentSite?.lastCheck ? 'Editar Site' : 'Adicionar Novo Site'}</h3>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="siteUrl" className="block text-sm font-medium mb-1">URL do Site</label>
//                 <input
//                   type="url"
//                   id="siteUrl"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
//                   placeholder="https://exemplo.com"
//                   value={currentSite?.url}
//                   onChange={(e) => setCurrentSite({ ...currentSite, url: e.target.value })}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="checkInterval" className="block text-sm font-medium mb-1">Intervalo de Verificação (minutos)</label>
//                 <input
//                   type="number"
//                   id="checkInterval"
//                   className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
//                   min="1"
//                   value={currentSite?.checkInterval}
//                   onChange={(e) => setCurrentSite({ ...currentSite, checkInterval: parseInt(e.target.value) || 5 })}
//                   required
//                 />
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                   {currentSite?.lastCheck ? 'Salvar Alterações' : 'Adicionar Site'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//     )
// }
// export default Modal