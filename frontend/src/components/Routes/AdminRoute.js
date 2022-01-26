import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from '../Core/Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'


const AdminRoute = ({ component: Component, ...rest }) => {
	const [id, setId] = useState();
	const [role, setRole] = useState();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		getRole();
	}, []);

	const getRole = async () => {
		const Axios = axios.create();
		Authentication.setAuthentication(Axios);

		const id = Cookies.get('id');
		const res = await Axios.get('/api/users/' + id,
			{
				params: { id: id }
			}
		);
		setId(() => (id));
		const role = res.data[0]?.role;
		setRole(() => (role));

		if (Authentication.isAuthenticated()) setAuthenticated(true);
	};

	return authenticated && <Route
		{...rest}
		render={props => {
			if (authenticated === true) {
				if (role === 'ADMIN') {
					const Axios = axios.create();
					Authentication.setAuthentication(Axios);
					return <Component {...rest} id={id} role={role} axios={Axios} />
				} else {
					return role && <Redirect
						to={{
							pathname: "/unauthorized",
							state: { from: props.location }
						}}
					/>
				}
			} else {
				return <Redirect
					to={{
						pathname: "/signin",
						state: { from: props.location }
					}}
				/>
			}
		}}
	/>
}

export default AdminRoute;