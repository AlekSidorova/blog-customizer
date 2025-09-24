import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

//тип для значений формы
export type FormValues = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	backgroundColor: string;
};

//тип для пропсов
type ArticleParamsFormProps = {
	isOpen: boolean;
	onClick: () => void;
	sidebarRef: React.RefObject<HTMLElement>;
	values: FormValues;
	onChange: (name: keyof FormValues, value: string) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onClick,
	sidebarRef,
	values,
	onChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	return (
		<>
			{/* используем просы - теперь при клике на стрелку isOpen будет меняться в App */}
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				ref={sidebarRef}
				//собираем классы с помощью clsx
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<div>
						<label>Шрифт</label>
						<select
							value={values.fontFamily}
							onChange={(e) => onChange('fontFamily', e.target.value)}>
							<option value="'Open sans', sans-serif">Open Sans</option>
							<option value="'Cormorant Garamond', serif">
								Cormorant Garamond
							</option>
							<option value="'Days One', sans-serif">Days One</option>
							<option value="'Merriweather', serif">Merriweather</option>
						</select>
					</div>

					<div>
						<label>Размер шрифта</label>
						<input
							type='number'
							value={parseInt(values.fontSize)}
							onChange={(e) => onChange('fontSize', e.target.value + 'px')}
						/>
					</div>

					<div>
						<label>Цвет шрифта</label>
						<input
							type='color'
							value={values.fontColor}
							onChange={(e) => onChange('fontColor', e.target.value)}
						/>
					</div>

					<div>
						<label>Цвет фона</label>
						<input
							type='color'
							value={values.backgroundColor}
							onChange={(e) => onChange('backgroundColor', e.target.value)}
						/>
					</div>

					<div>
						<label>Ширина контента</label>
						<input
							type='number'
							value={parseInt(values.containerWidth)}
							onChange={(e) =>
								onChange('containerWidth', e.target.value + 'px')
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={onReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
