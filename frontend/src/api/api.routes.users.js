export const postValidatePassword = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/api/users/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error validating password:', error);
        throw error;
    }
};

export const putUpdatePassword = async (user, data) => {
    console.log(user, data);
    try {
        const response = await fetch(`http://localhost:3000/api/users/${user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error validating password:', error);
        throw error;
    }
};