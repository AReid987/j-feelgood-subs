import React, { useState } from 'react';
import styles from './loginForm.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/authStore';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for login logic
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    console.log('Login attempted with:', { email, password });
    // Send login data to backend
 fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          useAuthStore.getState().setToken(data.access_token); // Store the token in Zustand
          // TODO: Store the token securely (e.g., in Zustand state)
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          alert(`Login failed: ${data.detail || 'Unknown error'}`);
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        alert('An error occurred during login. Please try again.');
      });
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
 className={styles.input}
          required
        />
        </div>
        <div className={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
 className={styles.input}
          required
        />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;