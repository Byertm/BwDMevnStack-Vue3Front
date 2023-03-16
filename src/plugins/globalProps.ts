import { getCurrentInstance } from 'vue';

const gp = () => {
	return getCurrentInstance()?.appContext?.config?.globalProperties;
};

export { gp };

export default gp;