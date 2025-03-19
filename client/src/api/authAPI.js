const login = async (userInfo) => {
    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data; // This will include the token if the login is successful
    }
    catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
export { login };
