const getTableInfo = () => {
	const list = [
		{
			headertitle: 'Name',
			rowdatakeys: ['firstname', 'lastname'],
			seperator: ' '
		},
		{
			headertitle: 'Email',
			rowdatakeys: ['email'],
		},
		{
			headertitle: 'Address',
			rowdatakeys: ['city', 'province', 'country'],
			seperator: ', '
		},
		{
			headertitle: 'Phone',
			rowdatakeys: ['phone'],
		},
		{
			headertitle: 'Registration Date',
			rowdatakeys: ['registrationdate'],
		},
	];

	return list;
}

export default getTableInfo;