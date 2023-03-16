export { customFetch as useFetch, customFetchCache as useFetchCache } from '@helpers/fetch-api';
export * from '@helpers/fetch-api';
export * from '@helpers/theme';

const isEmptyObject = (obj: Object) => obj?.constructor === Object && Object.keys(obj)?.length === 0;

const notEmptyObject = (obj: object) => obj?.constructor === Object && !!Object.keys(obj)?.length;

const getObjectLength = (obj: object) => (isEmptyObject(obj) ? 0 : Object.keys(obj).length);

const convertToSlug = (text: string) => {
	// return text
	// 	.toLowerCase()
	// 	.replace(/ /g, '-')
	// 	.replace(/[^\w-]+/g, '');

	text = text.normalize('NFKD');

	text = text.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLocaleLowerCase();
	// trim spaces at start and end of string
	text = text.replace(/^\s+|\s+$/gm, '');
	// replace space with dash/hyphen
	text = text.replace(/\s+/g, '-');
	return text;
};

const slugify = (text: string) => {
	if (text) {
		const trMap: { [key: string]: string } = { çÇ: 'c', ğĞ: 'g', şŞ: 's', üÜ: 'u', ıİ: 'i', öÖ: 'o' };

		for (let key in trMap) {
			text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
		}

		return text
			.replace(/[^-a-zA-Z0-9\s]+/gi, '') // remove non-alphanumeric chars
			.replace(/\s/gi, '-') // convert spaces to dashes
			.replace(/[-]+/gi, '-') // trim repeated dashes
			.toLowerCase();
	}

	return text;
};

export { isEmptyObject, notEmptyObject, getObjectLength, convertToSlug, slugify };
export default { isEmptyObject, notEmptyObject, getObjectLength, convertToSlug, slugify };