import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Site } from '../models/site';
import deleteSite from '../services/deleteSites';

interface LayoutContextProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    toggleTheme: () => void;

    isAddModalOpen: boolean;
    setIsAddModalOpen: (isOpen: boolean) => void;
    isEditModalOpen: boolean;
    setIsEditModalOpen: (isOpen: boolean) => void;

    sites: Site[];
    setSites: React.Dispatch<React.SetStateAction<Site[]>>;
    currentSite: Site | null;
    setCurrentSite: (site: Site | null) => void;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (isOpen: boolean) => void;
    siteToDelete: Site | null;
    setSiteToDelete: (sote: Site) => void;

    handleAddSite: () => void;
    handleEditSite: (url: string) => void;
    handleDeleteSite: (site: Site) => void;
    confirmDelete: () => void;
    // handleSubmit: (e: React.FormEvent) => void;

    selectedSiteLogs: Site | null;
    setSelectedSiteLogs: (site: Site | null) => void;
    isLogsSectionVisible: boolean;
    setIsLogsSectionVisible: (isVisible: boolean) => void;

    showSiteLogs: (site: Site) => void;
    hideSiteLogs: () => void;


    logs: any[];
    setLogs: React.Dispatch<React.SetStateAction<never[]>>;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedSiteLogs, setSelectedSiteLogs] = useState<Site | null>(null);
    const [isLogsSectionVisible, setIsLogsSectionVisible] = useState(false);

    const [logs, setLogs] = useState([]);
    const [sites, setSites] = useState<Site[]>([

        {
            id: 1,
            url: 'https://local.example.com',
            created_at: '2023-10-01T12:00:00Z',
        }
    ]);

    const [currentSite, setCurrentSite] = useState<Site | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleAddSite = () => {
        setCurrentSite({
            id: 0,
            url: '',
            created_at: '',
        });
        setIsAddModalOpen(true);
    };

    const handleEditSite = (url: string) => {
        const site = sites.find(site => site.url === url);
        if (site) {
            setCurrentSite({ ...site });
            setIsEditModalOpen(true);
        }
    };

    const handleDeleteSite = (site: Site) => {
        setSiteToDelete(site);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (siteToDelete) {
            deleteSite(setSites, siteToDelete.id)
            setIsDeleteModalOpen(false);
        }
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (!currentSite) return;

    //     const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    //     if (sites.some(site => site.url === currentSite.url)) {
    //         // Update existing site
    //         setSites(sites.map(site =>
    //             site.url === currentSite.url ? { ...currentSite, lastCheck: now } : site
    //         ));
    //     } else {
    //         // Add new site
    //         setSites([...sites, {
    //             ...currentSite,
    //             lastCheck: now,
    //             status: '200 OK',
    //             responseTime: '0.000000s'
    //         }]);
    //     }

    //     setIsAddModalOpen(false);
    //     setIsEditModalOpen(false);
    //     setCurrentSite(null);
    // };


    const showSiteLogs = (site: Site) => {
        setSelectedSiteLogs(site);
        setIsLogsSectionVisible(true);
        
        // Scroll para a seção (React-style)
        setTimeout(() => {
          document.getElementById('siteLogs')?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Pequeno delay para garantir que o elemento está renderizado
      };
      
      const hideSiteLogs = () => {
        setIsLogsSectionVisible(false);
      };
      


    return (
        <LayoutContext.Provider value={{
            theme,
            setTheme,
            toggleTheme,

            isAddModalOpen,
            setIsAddModalOpen,
            isEditModalOpen,
            setIsEditModalOpen,

            sites,
            setSites,
            currentSite,
            setCurrentSite,

            isDeleteModalOpen,
            setIsDeleteModalOpen,
            siteToDelete,
            setSiteToDelete,

            handleAddSite,
            handleEditSite,
            handleDeleteSite,
            confirmDelete,
            // handleSubmit

            isLogsSectionVisible,
            setIsLogsSectionVisible,
            selectedSiteLogs,
            setSelectedSiteLogs,

            showSiteLogs,
            hideSiteLogs,

            logs,
            setLogs,
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = (): LayoutContextProps => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayoutContext must be used within a LayoutProvider');
    }
    return context;
};