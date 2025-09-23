import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

//тип для пропсов
type ArticleParamsFormProps = {
	isOpen: boolean; // открыта ли форма
	onClick: () => void; //функция переключения
};

//принимаем пропсы из index.tsx
export const ArticleParamsForm = ({
	isOpen,
	onClick,
}: ArticleParamsFormProps) => {
	return (
		<>
			{/* используем просы - теперь при клике на стрелку isOpen будет меняться в App */}
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				//собираем классы с помощью clsx
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
