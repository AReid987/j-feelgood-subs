"use client";
typescriptreact
import React, { useState } from 'react';
import styles from './register.module.css';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const router = useRouter();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Basic client-side validation
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Send registration data to backend
 fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
 'Content-Type': 'application/json',
      },
 body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (response.ok) {
          // TODO: Handle successful registration (e.g., redirect to login)
        } else {
          // Assuming the backend sends error details in the 'detail' field
          alert(`Registration failed: ${data.detail || 'Unknown error'}`);
        }
      })
      .catch(error => {
        console.error('Registration failed:', error);
        // TODO: Handle registration errors (e.g., display error message)
        alert('An error occurred during registration. Please try again.');
      });
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleRegistration}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required className={styles.input} value={email} onChange={handleEmailChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required className={styles.input} value={password} onChange={handlePasswordChange} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;