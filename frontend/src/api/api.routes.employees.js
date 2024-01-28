export const getEmployees = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/employees');
        const data = await response.json();
        // setEmployeesData(data);
        return data;
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
}

export const updateEmployees = async (employeeName, data) => {
    try {
        const response = await fetch(`http://localhost:3000/api/employees/${employeeName}`, {
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