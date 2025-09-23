import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type FormValues = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	containerWidth: string;
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	//ставим начальное состояние-форма закрыта
	const [isOpen, setIsOpen] = useState(false);

	//функция переключения, которая меняет isOpen на противоположное
	const toggleOpen = () => setIsOpen((prev) => !prev);

	//находим сайдбар
	const sidebarRef = useRef<HTMLElement | null>(null);

	//закрытие при клике вне
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		//вешаем слушателя на весь документ
		document.addEventListener('mousedown', handleClickOutside);

		//чистим слушателя
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const defaultValues: FormValues = {
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
	};

	const [formValues, setFormValues] = useState<FormValues>(defaultValues);
	const [pageStyles, setPageStyles] = useState<FormValues>(defaultValues);

	const handleChange = (name: keyof FormValues, value: string) => {
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const applyChanges = () => setPageStyles(formValues);

	const resetChanges = () => {
		setFormValues(defaultValues);
		setPageStyles(defaultValues);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyles.fontFamily,
					'--font-size': pageStyles.fontSize,
					'--font-color': pageStyles.fontColor,
					'--container-width': pageStyles.containerWidth,
					'--bg-color': pageStyles.backgroundColor,
				} as CSSProperties
			}>
			{/* проверяет, открыта она или нет и что делать при нажатии на стрелку */}
			<ArticleParamsForm
				isOpen={isOpen}
				onClick={toggleOpen}
				sidebarRef={sidebarRef}
				values={formValues}
				onChange={handleChange}
				onApply={applyChanges}
				onReset={resetChanges}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
