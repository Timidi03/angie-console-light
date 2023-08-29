/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Igor Meleschenko
 * All rights reserved.
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { Connections } from '../connections.jsx';
import styles from '../style.css';

describe('<Connections IndexPage />', () => {
	const data = {
		connections: {},
		ssl: {}
	};

	it('constructor()', () => {
		const wrapper = shallow(<Connections data={ data } />);

		expect(wrapper.state('tab')).to.be.equal('conns');

		wrapper.unmount();
	});

	it('changeTab()', () => {
		const wrapper = shallow(<Connections data={ data } />);
		const instance = wrapper.instance();
		const stateSpy = spy(instance, 'setState');

		instance.changeTab('some_tab');

		expect(stateSpy.calledOnce, 'this.setState called once').to.be.true;
		expect(stateSpy.args[0][0], 'this.setState arg').to.be.deep.equal({
			tab: 'some_tab'
		});

		stateSpy.restore();
		wrapper.unmount();
	});

	it('getCurrentCell()', () => {
		const wrapper = shallow(<Connections data={ data } />);
		const instance = wrapper.instance();
		let cell = instance.getCurrentCell('not_a_number');

		expect(cell.type, '[value is a string] cell nodeName').to.be.equal('td');
		expect(cell.props.children[0], '[value is a string] cell child 1').to.be.equal('not_a_number');

		cell = instance.getCurrentCell(125);

		expect(cell.type, '[value is a number] cell nodeName').to.be.equal('td');
		expect(cell.props.children[0], '[value is a number] cell child 1').to.be.equal(125);
		expect(cell.props.children[1].props.className, '[value is a number] cell child 2 className')
			.to.be.equal(styles['current__sec']);

		wrapper.unmount();
	});

	it('render()', () => {
		const wrapper = shallow(
			<Connections
				data={{
					connections: {
						accepted: 10,
						current: 99,
						accepted_s: 18,
						active: 72,
						idle: 0,
						dropped: 1
					},
					ssl: {
						handshakes: 20,
						handshakes_failed: 30,
						session_reuses: 4,
						handshakes_s: 200,
						handshakes_failed_s: 300,
						session_reuses_s: 40
					}
				}}
				className='test'
			/>
		);
		const instance = wrapper.instance();
		const changeTabBindSpy = spy(instance.changeTab, 'bind');

		instance.forceUpdate();

		let indexBox = wrapper.find('IndexBox');

		expect(indexBox.prop('className'), 'IndexBox className').to.be.equal('test');
		// indexBox = indexBox.childAt(0);
		expect(indexBox.children(), 'IndexBox children length').to.have.lengthOf(3);
		expect(
			indexBox.childAt(0).prop('className'),
			'[Conns tab] accepted block className'
		).to.be.equal(styles['counter']);
		expect(indexBox.childAt(0).text(), '[Conns tab] accepted block text').to.be.equal('Accepted:10');
		expect(
			indexBox.childAt(1).prop('className'),
			'[Conns tab] tabs className'
		).to.be.equal(styles['tabs']);
		expect(
			indexBox.childAt(1).childAt(0).prop('className'),
			'[Conns tab] Connections tab className'
		).to.be.equal(styles['tab-active']);
		expect(
			indexBox.childAt(1).childAt(0).prop('onClick').name,
			'[Conns tab] Connections tab onClick'
		).to.be.equal('bound changeTab');
		expect(
			indexBox.childAt(1).childAt(0).text(),
			'[Conns tab] Connections tab text'
		).to.be.equal('Connections');

		expect(changeTabBindSpy, 'changeTab called once').to.be.calledOnce;
		expect(changeTabBindSpy.args[0][0], 'changeTab call 1 arg 1').to.be.deep.equal(instance);
		expect(changeTabBindSpy.args[0][1], 'changeTab call 1 arg 2').to.be.equal('conns');

		expect(indexBox.childAt(2).prop('className'), '[Conns tab] table className').to.be.equal(styles['table']);
		expect(
			indexBox.childAt(2).childAt(0).children(),
			'[Conns tab] table row 1 children length'
		).to.have.lengthOf(5);
		expect(
			indexBox.childAt(2).childAt(1).childAt(0).text(),
			'[Conns tab] table row 2 children 1'
		).to.be.equal('99');
		expect(
			indexBox.childAt(2).childAt(1).childAt(1).text(),
			'[Conns tab] table row 2 children 2'
		).to.be.equal('18');
		expect(
			indexBox.childAt(2).childAt(1).childAt(2).text(),
			'[Conns tab] table row 2 children 3'
		).to.be.equal('72');
		expect(
			indexBox.childAt(2).childAt(1).childAt(3).text(),
			'[Conns tab] table row 2 children 4'
		).to.be.equal('0');
		expect(
			indexBox.childAt(2).childAt(1).childAt(4).text(),
			'[Conns tab] table row 2 children 5'
		).to.be.equal('1');

		changeTabBindSpy.restore();
		wrapper.unmount();
	});
});
