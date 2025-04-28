import { useState, useEffect, useRef } from "react";
import { useLayoutContext } from "../contexts/LayoutContext";
import { X } from "lucide-react";

const SiteLogs = () => {
    const { selectedSiteLogs, hideSiteLogs, isLogsSectionVisible, logs, setLogs } = useLayoutContext();
    
    const [loading, setLoading] = useState(false);
    const logsContainerRef = useRef(null);

    // Função para buscar os logs do site na API
    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8001/relatorios/`);
            if (response.ok) {
                const data = await response.json();
                // Filtra os logs pelo site selecionado
                const filteredLogs = data.filter(log => log.site_id === selectedSiteLogs?.id);
                setLogs(filteredLogs);
               
            } else {
                console.error("Erro ao buscar os logs:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
        } finally {
            setLoading(false);
        }
    };


    // Função para formatar a data em hora:minuto:segundo
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    useEffect(() => {
        if (isLogsSectionVisible && selectedSiteLogs) {
            fetchLogs(); // Carrega os logs ao montar o componente
        }
    }, [isLogsSectionVisible, selectedSiteLogs]);

    // Reverter a ordem dos logs
    const reversedLogs = [...logs].reverse();

    if (!isLogsSectionVisible || !selectedSiteLogs) {
        return null;
    }

    return (
        <div id="siteLogs" className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 id="siteTitle" className="text-2xl font-bold">
                    Logs de {selectedSiteLogs.url}
                </h2>
                <button onClick={hideSiteLogs} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <X className="h-6 w-6" />
                </button>
            </div>

            {/* Botão de reload */}
            <div className="flex items-center space-x-4 mb-4">
                <button
                    onClick={fetchLogs}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Recarregar Logs
                </button>

            </div>

            {/* Renderiza os logs */}
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Carregando logs...</p>
            ) : (
                <ul
                    ref={logsContainerRef}
                    className="space-y-4 overflow-y-auto max-h-[600px]"
                >
                    {reversedLogs.length > 0 ? (
                        reversedLogs.map((log, index) => (
                            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Status:</strong> {log.status_code}
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Tempo de resposta:</strong> {log.response_time}s
                                </p>
                                <p className="text-gray-800 dark:text-gray-200">
                                    <strong>Hora:</strong> {formatTimestamp(log.timestamp)}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">Nenhum log encontrado.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SiteLogs;
