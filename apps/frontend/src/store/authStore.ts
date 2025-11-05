import {create} from 'zustand';
import { StateCreator } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

const authStoreCreator: StateCreator<AuthState> = (set) => ({
  token: null,
  setToken: (token) => set({ token }),
});

const useAuthStore = create<AuthState>(authStoreCreator);

export default useAuthStore;
