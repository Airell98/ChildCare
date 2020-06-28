

const verify = require('../helper/jwtVerify')



const authenticationParent = (req, res, next) => {
	const { access_token } = req.headers;

	if (!access_token) {
		next({name: 'TOKEN_NOT_FOUND'})
	}

	try {

		const decoded = verify(access_token);
		req.parentData = decoded;

	

		next();
	} catch (err) {
		next({name: 'AUTHENTICATION_FAILED'})
	}
};

const authenticationAgency = (req, res, next) => {
	const { access_token } = req.headers;

	if (!access_token) {
		next({name: 'TOKEN_NOT_FOUND'})
	}

	try {
		const decoded = verify(access_token);
		req.agencyData = decoded;

		next();
	} catch (err) {
		next({name: 'AUTHENTICATION_FAILED'})
	}
}

module.exports = {
	authenticationParent,
	authenticationAgency
}
