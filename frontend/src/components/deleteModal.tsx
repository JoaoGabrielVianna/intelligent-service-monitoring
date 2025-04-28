import { useLayoutContext } from "../contexts/LayoutContext"

function DeleteModal() {
    const { siteToDelete, setIsDeleteModalOpen, confirmDelete } = useLayoutContext()

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-center">Confirmar Exclusão</h3>
                </div>

                <p className="mb-6 text-center">
                    Tem certeza que deseja excluir <span className="font-semibold">{siteToDelete?.id}</span>?
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setIsDeleteModalOpen(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>

    )
}
export default DeleteModal