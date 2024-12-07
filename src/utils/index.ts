export const formatPrice = (price:number)=> {
    return price.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })
}


export const fetchData = async (endpoint:string) => {
    const API_URL="http://localhost:8080"
    try {
        console.log(import.meta.env.API_URL)
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};