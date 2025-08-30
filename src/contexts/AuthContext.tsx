import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills?: string[];
  company?: string;
  industry?: string;
  rating?: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'worker' | 'employer' | null;
  login: (email: string, password: string, type: 'worker' | 'employer') => Promise<boolean>;
  signup: (userData: any, type: 'worker' | 'employer') => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'worker' | 'employer' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('quickhire_user');
    const storedUserType = localStorage.getItem('quickhire_userType');
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType as 'worker' | 'employer');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'worker' | 'employer'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on type
      const mockUser: User = type === 'worker' 
        ? {
            id: '1',
            name: 'John Worker',
            email,
            phone: '+1234567890',
            location: 'New York, NY',
            skills: ['Construction', 'Driving', 'Cleaning'],
            rating: 4.8,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          }
        : {
            id: '2',
            name: 'Jane Employer',
            email,
            company: 'ABC Construction Co.',
            industry: 'Construction',
            location: 'New York, NY',
            rating: 4.9,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
          };

      setUser(mockUser);
      setUserType(type);
      
      // Store in localStorage
      localStorage.setItem('quickhire_user', JSON.stringify(mockUser));
      localStorage.setItem('quickhire_userType', type);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: any, type: 'worker' | 'employer'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        ...(type === 'worker' 
          ? { skills: userData.skills || [] }
          : { company: userData.company, industry: userData.industry }
        ),
        rating: 0,
      };

      setUser(newUser);
      setUserType(type);
      
      // Store in localStorage
      localStorage.setItem('quickhire_user', JSON.stringify(newUser));
      localStorage.setItem('quickhire_userType', type);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('quickhire_user');
    localStorage.removeItem('quickhire_userType');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('quickhire_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    userType,
    login,
    signup,
    logout,
    updateProfile,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};