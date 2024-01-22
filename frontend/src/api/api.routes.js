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