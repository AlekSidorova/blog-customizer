import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

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

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			{/* проверяет, открыта она или нет и что делать при нажатии на стрелку */}
			<ArticleParamsForm
				isOpen={isOpen}
				onClick={toggleOpen}
				sidebarRef={sidebarRef}
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
