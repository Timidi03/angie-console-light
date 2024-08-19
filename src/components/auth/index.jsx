import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './styles.css';
import React from "react";
import Cookies from 'js-cookie';



const LoginModal = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: 'include',
            })

            console.log(document.cookie)
            const data = await response.json();



            const token = Cookies.get('access_token');
            if (token) {
                onLogin();
            }


            // Пример простой проверк
            if (data.status === 'OK') {
                onLogin();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.h2}>Авторизация</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formGroupLabel}>Email</label>
                        <input className={styles.formGroupInput}
                            // type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formGroupLabel}>Password</label>
                        <input className={styles.formGroupInput}
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required
                        />
                    </div>
                    <button type="submit"
                            className={styles.button}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
