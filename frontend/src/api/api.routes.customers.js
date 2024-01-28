export const getCustomers = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/customers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
}

export const createCustomers = async(dataCustomers) => {
    try {
        const response = await fetch(`http://localhost:3000/api/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataCustomers),
        });
        return response;
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
}