
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body: { email, password } }) {
	console.log('sign-in js', {email}, {password})

  // ⚠️ CAUTION: Do not store a plain password like this. Use proper hashing and salting.
	// if (!user || user.password !== password) {
	// 	return {
	// 		status: 401,
	// 		body: {
	// 			message: 'Incorrect user or password',
	// 		},
	// 	};
	// }

	// const { id } = await createSession(email);
	return {
		status: 200,
		body: {
			message: 'Successfully signed in'
		},
	};
}