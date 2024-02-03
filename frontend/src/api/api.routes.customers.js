export const getCustomers = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/customers');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finding customer data:', error);
    }
};

export const getCustomersName = async (name, available) => {
    try {
        const response = await fetch(`http://localhost:3000/api/customers/${name}/${available}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finding customer data:', error);
        return null; 
    }
};

export const getCustomersNameTurn = async (name, turn) => {
    try {
        const response = await fetch(`http://localhost:3000/api/customers/name/${name}/${turn}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error finding customer data:', error);
        return null; 
    }
};

export const updateCustomers = async (name, turn, data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/customers/${name}/${turn}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response;
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