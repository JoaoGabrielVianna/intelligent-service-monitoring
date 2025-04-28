
import { Sun, Moon, Activity } from 'lucide-react';
import { useLayoutContext } from '../contexts/LayoutContext';



function Navbar() {
    const { theme, toggleTheme } = useLayoutContext();
    
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Activity className="text-blue-500" />
                    <span className="text-xl font-bold">SiteMonitor</span>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {theme === 'light' ? <Moon /> : <Sun />}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

