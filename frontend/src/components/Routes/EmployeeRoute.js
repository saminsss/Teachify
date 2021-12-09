import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from '../Core/Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'

const Axios = axios.create();
Authentication.setAuthentication(Axios);

const EmployeeRoute = ({ component: Component, ...rest }) => {
	const [role, setRole] = useState('');

	useEffect(() => {
		const getRole = async () => {
			try {
				const id = Cookies.get('id');
				if (!id) return;

				const res = await Axios.get('/api/users/' + id,
					{
						params: { id: id }
					}
				)
				const role = res.data[0]?.role;
				setRole(() => (role));
			} catch (err) {
				console.log(err);
			}
		}

		getRole();
	}, [])

	return (
		<Route
			{...rest}
			render={props => {
				const authenticated = Authentication.isAuthenticated();
				if (authenticated === true) {
					//if user is either admin or employee then continue to component
					if (role === 'A' || role === 'E') {
						return <Component {...props} role={role} />
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
	)
}

export default EmployeeRoute;