import { Site } from "../models/site";
import fetchSites from "./fetchSites";

const deleteSite = async (setSites: (sites: Site[]) => void, siteId: number) => {

  try {
    const response = await fetch(`http://localhost:8002/sites/${siteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Site deleted:', data);

    // Atualize os sites após a exclusão
    fetchSites(setSites); // Recarregar a lista de sites

  } catch (error) {
    console.error('Error deleting site:', error);
  }
}

export default deleteSite;
