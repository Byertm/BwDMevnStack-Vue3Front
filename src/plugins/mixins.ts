import { IPost } from '@models/index';
import { exampleHtmlContent } from '@plugins/exampleContent';

export const API_PORT = 9000;
export const API_URL = import.meta.env.VITE_API_URL || `http://localhost:${API_PORT}`;

export type Article = {
	id: number;
	title: string;
	content: string;
	author?: string;
	category: string;
	image: string;
	date: string | Date;
	like: number;
	comment: number;
	slug: string;
};

export type Education = { id: number; start_date: number | string; finish_date: number | string; title: string; school: string; section: string; description: string };

export type Experience = { id: number; start_date: number | string; finish_date: number | string; title: string; company: string; section?: string; description: string };

export type Awward = { id: number; start_date: number | string; finish_date: number | string; title: string; company: string; description: string };

export interface IPostOld {
	_id: string;
	title: string;
	preTitle: string;
	content: string;
	creator?: string;
}

export const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('default', { dateStyle: 'long' })?.format?.(date);
};

export const formatDateGetMonthAndYear = (dateString: string | Date) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('default', { month: 'long', year: 'numeric' })?.format?.(date);
};

export const getApiImageByImageUrl = (imageUrl: string | null) => {
	return `${API_URL}/${imageUrl}`;
};

export const formatEducation = (education: any) => {
	return {
		id: education.id,
		title: education.title,
		school: education.school,
		section: education.section,
		description: education.description,
		start_date: formatDateGetMonthAndYear(education.startDate),
		finish_date: formatDateGetMonthAndYear(education.finishDate)
	} as Education;
};

export const formatExperience = (experience: any) => {
	return {
		id: experience.id,
		title: experience.title,
		company: experience.company,
		section: experience.section,
		description: experience.description,
		start_date: formatDateGetMonthAndYear(experience.startDate),
		finish_date: formatDateGetMonthAndYear(experience.finishDate)
	} as Experience;
};

export const formatPost = (post: any) => {
	return {
		id: post.id,
		title: post.title,
		content: post.content,
		category: post.category?.name || '',
		author: post.author?.name || '',
		image: getApiImageByImageUrl(post.imageUrl),
		date: formatDate(post?.createdAt) || '',
		like: 0,
		comment: post.comments?.length || 0,
		slug: post.slug
	} as Article;
};

export const formatProject = (project: any) => {
	return {
		id: project.id,
		name: project.name,
		description: project.description,
		imageUrl: getApiImageByImageUrl(project.imageUrl) || '/assets/img/work/01.jpg',
		demoPreviewUrl: project.demoPreviewUrl,
		deployUrl: project.deployUrl,
		categoryId: project.categoryId.name,
		startDate: formatDateGetMonthAndYear(project.startDate),
		finishDate: formatDateGetMonthAndYear(project.finishDate),
		createdAt: formatDateGetMonthAndYear(project.createdAt),
		updatedAt: formatDateGetMonthAndYear(project.updatedAt)
	};
};

export const formatCategory = (category: any) => {
	return {
		id: category.id,
		name: category.name,
		slug: category.slug,
		url: getApiImageByImageUrl(category.url),
		parentId: category.parentId,
		createdAt: formatDate(category.createdAt),
		updatedAt: formatDate(category.updatedAt),
		isActive: category.isActive
	};
};

export const formatTag = (tag: any) => {
	return {
		id: tag.id,
		name: tag.name,
		slug: tag.slug,
		url: tag.url,
		createdAt: formatDate(tag.createdAt),
		updatedAt: formatDate(tag.updatedAt),
		isActive: tag.isActive
	};
};

export const exampleContent: string =
	"Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.";

export const awwardList: Awward[] = [
	{
		id: 1,
		start_date: '2018',
		finish_date: '2019',
		title: 'En İyi Arayüz Tasarımı',
		company: 'Altın Örümcek',
		description: 'En iyi arayüz tasarımı yapan geliştirici seçildim.'
	},
	{ id: 2, start_date: '2019', finish_date: '2020', title: 'En İyi Web Geliştirici', company: 'Altın Örümcek', description: 'En iyi web geliştirici seçildim.' },
	{ id: 3, start_date: '2020', finish_date: '2021', title: 'En İyi Yazılım Uzmanı', company: 'Altın Örümcek', description: 'En iyi yazılım uzmanı seçildim.' }
];

export const articlesData: Article[] = [
	{
		id: 1,
		slug: '/blog/post-01',
		title: 'Yeni blog yayında',
		image: 'src/assets/img/blog/01.jpg',
		content: exampleHtmlContent,
		category: 'Web Project',
		date: new Date(2023, 1, 1),
		comment: 3,
		like: 482
	},
	{
		id: 2,
		slug: '/blog/post-02',
		title: 'Yeni kişisel web sitem yayında',
		image: 'src/assets/img/blog/02.jpg',
		content: exampleHtmlContent,
		category: 'Web Project',
		date: new Date(2022, 12, 31),
		comment: 3,
		like: 357
	},
	{
		id: 3,
		slug: '/blog/post-03',
		title: 'Css transition özelliğini tanıyalım',
		image: 'src/assets/img/blog/03.jpg',
		content: exampleContent,
		category: 'Html & Css',
		date: new Date(2020, 1, 11),
		comment: 3,
		like: 89
	},
	{
		id: 4,
		slug: '/blog/post-04',
		title: 'JavaScript Array fonksiyonlarını tanıyalım',
		image: 'src/assets/img/blog/04.jpg',
		content: exampleContent,
		category: 'JavaScript',
		date: new Date(2019, 3, 13),
		comment: 3,
		like: 871
	},
	{
		id: 5,
		slug: '/blog/post-05',
		title: 'JavaScript String fonksiyonlarını tanıyalım',
		image: 'src/assets/img/blog/04.jpg',
		content: exampleContent,
		category: 'JavaScript',
		date: new Date(2019, 2, 15),
		comment: 3,
		like: 57
	},
	{
		id: 6,
		slug: '/blog/post-06',
		title: 'JavaScript Nedir?',
		image: 'src/assets/img/blog/06.jpg',
		content: exampleContent,
		category: 'JavaScript',
		date: new Date(2019, 1, 30),
		comment: 3,
		like: 127
	},
	{
		id: 7,
		slug: '/blog/post-07',
		title: 'Css Nedir?',
		image: 'src/assets/img/blog/06.jpg',
		content: exampleContent,
		category: 'Css',
		date: new Date(2015, 1, 15),
		comment: 3,
		like: 523
	},
	{
		id: 8,
		slug: '/blog/post-08',
		title: 'Html Nedir?',
		image: 'src/assets/img/blog/06.jpg',
		content: exampleContent,
		category: 'Html',
		date: new Date(2015, 1, 1),
		comment: 3,
		like: 445
	}
];

export const educationList: Education[] = [
	{
		id: 1,
		start_date: 2011,
		finish_date: 2013,
		title: '',
		school: 'Giresun Üniversitesi - Şebinkarahisar T.B.M.Y.O',
		section: 'Bilgisayar Teknolojileri / Bilgisayar Programcılığı',
		description:
			"Şebinkarahisar Teknik Bilimler Meslek Yüksekokulu, 2011 - 2013 yılları arasında 2 Yıllık Bilgisayar Programcılığı bölümünü bitirdim. Bölümüm de derece yapmak gibi bir amacım olmadı, lakin üniversite'den kıdemli bir personel ya da eğetim görevlisinden referans alabilirsiniz."
	},
	{
		id: 2,
		start_date: 2007,
		finish_date: 2011,
		title: '',
		school: 'Dr.Nureddin Erk - Perihan Erk Endüstri M. Lisesi',
		section: 'Bilgisayar Teknolojileri / Web Tasarım',
		description:
			'2007 - 2011 yılları arasında 4 Yıllık lise hayatımı, Web Tasarım bölümünü okuyarak bitirdim. Bölümde ve sınıfta özellikle son sınıfta en iyi decereye sahip olmama rağmen tarih dersimin zayıf olması sebebi ile sadece onur belgesine layık görüldüm.'
	}
];

export const experienceList: Experience[] = [
	{
		id: 8,
		start_date: 'Kasım 2019',
		finish_date: 'Mayıs 2022',
		title: 'Kıdemli Ön Yüz Web Geliştirici',
		company: 'Netaş (BDH) / Turkcell Global Bilgi Teknolojileri',
		description:
			'Turkcell Global Bilgi bünyesinde; Turkcell Global Bilgi Globalim projesi başta olmak üzere, özel (back office) kurumsal projelerin tasarımlarını kodlamak ve geliştirmek.'
	},
	{
		id: 7,
		start_date: 'Aralık 2018',
		finish_date: 'Kasım 2019',
		title: 'Ön Yüz Web Geliştirici',
		company: 'Bağımsız Savaşçı (Freelance)',
		description: 'Goygoydan ve "burası patron şirketi" şımarlıklarından uzakta, kafası hep karışık ama gönlü rahat çalışma ortamı.'
	},
	{
		id: 6,
		start_date: 'Haziran 2018',
		finish_date: 'Aralık 2018',
		title: 'Kıdemli Ön Yüz Web Geliştirici',
		company: 'De Marke Labs',
		description: `De Marke Labs bünyesinde; De Marke web projeleri, Özel (Progressive) web projeleri, özel kurumsal projelerin tasarımlarını kodlamak ve geliştirmek.
		<ul class="uk-list uk-list-collapse uk-list-bullet uk-margin-small-top">
			<li>Müşterilere ait kurumsal web sitelerinin yapımı ve kontrolü,</li>
			<li>Özel projelerinin tasarımlarını hazırlamak, kodlama ve geliştirilmesi</li>
		</ul>`
	},
	{
		id: 5,
		start_date: 'Ocak 2018',
		finish_date: 'Haziran 2018',
		title: 'Ön Yüz Web Geliştirici',
		company: 'Bağımsız Savaşçı (Freelance)',
		description: 'Goygoydan ve "burası patron şirketi" şımarlıklarından uzakta, kafası hep karışık ama gönlü rahat çalışma ortamı.'
	},
	{
		id: 4,
		start_date: 'Aralık 2014',
		finish_date: 'Ocak 2018',
		title: 'Web Arayüz Geliştirici',
		company: 'Eryaz Bilgi Teknolojileri',
		description: `Eryaz Bilgi Teknolojileri bünyesindeki b2b, b2c ve web sitelerin tasarımlarını hazırlamak ve geliştirmek.
		<ul class="uk-list uk-list-collapse uk-list-bullet uk-margin-small-top">
			<li>Müşterilere ait kurumsal web sitelerinin yapımı ve kontrolü,</li>
			<li>B2B projelerinin tasarımlarını hazırlama, kodlama ve geliştirilmesi,</li>
			<li>B2C projelerinin tasarımlarını hazırlama, kodlama ve geliştirilmesi,</li>
			<li>Özel projelerinin tasarımlarını hazırlamak, kodlama ve geliştirilmesi</li>
		</ul>`
	},
	{
		id: 3,
		start_date: 'Ocak 2014',
		finish_date: 'Aralık 2014',
		title: 'Web Yazılım Uzmanı',
		company: 'Yesis Bilişim Teknolojileri',
		description: 'Yesis Bilişim Teknolojileri bünyesindeki web sitelerin kontrolü, güncellenmesi ve yenilenmesi. Yeni web projelerinin yönetimi.'
	},
	{
		id: 2,
		start_date: 'Ocak 2013',
		finish_date: 'Mayıs 2013',
		title: 'Web Tasarım Uzmanı',
		company: 'Ekincioğlu Grup',
		description: `Lise sonrası kısa dönemli bir işti. Lakin iş yerindeki bütün olumsuzluklara rağmen ayrılma nedenim eğitim hayatıma devam etme kararımdı.
		<ul class="uk-list uk-list-collapse uk-list-bullet uk-margin-small-top">
			<li>Ekincioğlu Grup'a ait web sitelerinin kontrolü,</li>
			<li>Site girilen ilanların; grafiklerini düzenleme,</li>
			<li>Bu grafikleri sitelere aktarma,</li>
			<li>Ofis bilgisayarların kontrolü gibi işlerin kontrolünü gerçekleştirdim.</li>
		</ul>`
	},
	{
		id: 1,
		start_date: 'Eylül 2010',
		finish_date: 'Haziran 2011',
		title: 'Stajyer (IT Manager)',
		company: 'Honeywell Otomasyon A.Ş',
		description: `Haftada üç (tam) gün, lise stajı. Stajımı Honeywell'in IT Depertmanında stajyer olarak geçirdim.
		<ul class="uk-list uk-list-collapse uk-list-bullet uk-margin-small-top">
			<li>Otomasyon & Bina Otomasyonu nedir, nerede ve nasıl kullanılır</li>
			<li>Yangın İhbar Sistemi (YİS) nedir, nerede ve nasıl kullanılır</li>
			<li>Kartlı Geçiş Sistemi (KGS) nedir, nerede ve nasıl kullanılır</li>
			<li>Asp, C, C+, C++, C#, .Net, ve Microsoft Web Developer (temel) kullanımı gibi değerli bilgilere sahip oldum.</li>
		</ul>`
	}
];