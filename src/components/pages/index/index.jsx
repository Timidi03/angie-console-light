/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */
import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import AboutAngie from './aboutangie/aboutangie.jsx';
import Connections from './connections/connections.jsx';
import ServerZones from './serverzones/serverzones.jsx';
import styles from './style.css';

export default class Index extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div>
				<div className={ styles.row }>
					<AboutAngie className={ styles.box } />
					<Connections className={ styles.connections } />
				</div>

				<div className={ `${ styles.row } ${ styles['row-wrap'] }` }>
					<ServerZones />
				</div>
			</div>
		);
	}
};
