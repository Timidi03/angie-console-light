/*
*
 * Copyright 2023-present, Web Server LLC
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * Copyright 2017-present, Igor Meleshchenko
 * All rights reserved.
 *
 */
import 'preact/debug';
import 'whatwg-fetch';
import React from 'react';
import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import App from '../../angie-console-light/src/App.jsx';
import appsettings from '../../angie-console-light/src/appsettings';
import tooltips from '../../angie-console-light/src/tooltips/index.jsx';
import LoginModal from './components/auth/index.jsx';
import Header from '../../angie-console-light/src/components/header/header.jsx'; // Импортируем модальное окно

function Root() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			console.log(document.cookie)
			try {
				const response = await fetch('http://localhost:8000/verify-token', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					credentials: 'include',
				});

				const data = await response.json();
				if (data.status === 'ok') {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error('Error:', error);
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	return (
		<div>
			<Header /> {/* Header всегда показывается */}
			{!isAuthenticated && <div className="page-content-overlay" />}
			{!isAuthenticated ? (
				<LoginModal onLogin={handleLogin} />
			) : (
				<App.Component /> // Полное приложение загружается только после авторизации
			)}
		</div>
	);
}

// Стиль затемнения для неавторизованных пользователей
const pageContentStyle = document.createElement('style');
pageContentStyle.innerHTML = `
  .page-content-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;
document.head.appendChild(pageContentStyle);

export const start = () => {
	appsettings.init();
	tooltips.initTooltips();

	const fragment = document.createDocumentFragment();

	React.render(<Root />, fragment);

	document.body.appendChild(fragment);
};
