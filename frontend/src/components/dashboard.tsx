import { AlertTriangle, CheckCircle, Globe } from "lucide-react";
import { useLayoutContext } from "../contexts/LayoutContext";

function Dashboard() {
    const { sites } = useLayoutContext();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Total de Sites</h3>
                    <Globe className="text-blue-500" />
                </div>
                <p className="text-2xl font-bold mt-2">{sites.length}</p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md opacity-50 pointer-events-none relative">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Sites Online</h3>
                    <CheckCircle className="text-green-500" />
                </div>
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Em breve
                </span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md opacity-50 pointer-events-none relative">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Alertas Ativos</h3>
                    <AlertTriangle className="text-yellow-500" />
                </div>
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Em breve
                </span>
            </div>
        </div>

    );
}
export default Dashboard;