import { parse } from 'cookie';
import { getSessionFromApi } from './lib/helpers/api';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '');

	if (cookies.directus_refresh_token) {
		// console.log('hooks directus', await getSessionFromApi(cookies.session_id))
		// const {email} = await getSessionFromApi(cookies.session_id)
		request.locals.user = {
			authenticated: true
		}
		// const session = await getSessionFromApi(cookies.directus_refresh_token);
		// if (session) {
		// 	request.locals.user = { email: session.email };
		// 	return resolve(request);
		// }
		return resolve(request);
	}

	request.locals.user = null;
	return resolve(request);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
	return request?.locals?.user
		? {
				user: {
					...request.locals.user
				},
		  }
		: {};
}