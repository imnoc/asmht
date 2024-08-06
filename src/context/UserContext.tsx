import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface cho thông tin người dùng
interface User {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}


const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
     
        const fetchUserData = async () => {
            const response = await fetch('/api/user');
            const data: User = await response.json();
            setUser(data);
        };
        fetchUserData();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
