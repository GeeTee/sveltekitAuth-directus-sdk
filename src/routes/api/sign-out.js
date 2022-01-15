import { removeSession } from '$lib/helpers/api';
import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ headers: { cookie } }) {
	const cookies = parse(cookie || '');

	if (cookies.session_id) {
		await removeSession(cookies.session_id);
	}

	return {
		status: 200,
		body: {
			message: "deconnecte"
		}
	};
}