export const LocalStorageKeys = { Token: 'token', User: 'user', AccessToken: 'accessToken', RefreshToken: 'refreshToken' } as const;

export class Token {
	accessToken!: string;
	refreshToken!: string;
	expirationDate!: Date;
}

type TKeys = (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys]; // `${LocalStorageKeys}`; // Note: TS Version 4.1.5'ten itibaren kullanılabilir.

type SetData<T> = { key: TKeys; value: T };

const get = (key: TKeys) => {
	return localStorage.getItem(key);
};

const getWithParse = (key: TKeys) => {
	return JSON.parse(get(key) || 'null');
};

const set = ({ key, value }: SetData<any>) => {
	localStorage.setItem(key, value);
};

const setWithStringfyForData = ({ key, value: _value }: SetData<any>) => {
	set({ key, value: JSON.stringify(_value) });
};

const setWithModel = (data: SetData<any>) => {
	let { key, value } = data;
	// set(data);
	localStorage.setItem(key, value);
};

const remove = (key: TKeys) => {
	localStorage.removeItem(key);
};

//private
const clear = () => {
	localStorage.clear();
};

const length = () => {
	return localStorage.length;
};

const key = (index: number) => {
	return localStorage.key(index);
};

export {
	get as getLS,
	getWithParse as getLSWithParse,
	set as setLS,
	setWithStringfyForData as setLSWithStringfyForData,
	setWithModel as setLSWithModel,
	remove as removeLS,
	length as lengthLS,
	key as keyLS
};

export default { get, getWithParse, set, setWithStringfyForData, setWithModel, remove, length, key };