import { Site } from "../models/site";

const fetchSites = async (setSites: (sites: Site[]) => void) => {
    try {
        const response = await fetch('http://localhost:8002/sites');
        const data = await response.json();
        setSites(data);
        

    } catch (error) {
        console.error('Error fetching sites:', error);

    } finally {


    }

};

export default fetchSites;