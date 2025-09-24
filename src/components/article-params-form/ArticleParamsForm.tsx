import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

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

					<Select
						title='Шрифт'
						//указываем, какой элемент должен быть выбран
						selected={
							fontFamilyOptions.find(
								(opt) => opt.value === values.fontFamily
							) || null
						}
						options={fontFamilyOptions}
						//изменения
						onChange={(option) => onChange('fontFamily', option.value)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={
							fontSizeOptions.find((opt) => opt.value === values.fontSize) ||
							fontSizeOptions[0]
						}
						onChange={(option) => onChange('fontSize', option.value)}
					/>

					<Select
						title='Цвет шрифта'
						selected={
							fontColors.find((opt) => opt.value === values.fontColor) || null
						}
						options={fontColors}
						onChange={(option) => onChange('fontColor', option.value)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={
							backgroundColors.find(
								(opt) => opt.value === values.backgroundColor
							) || null
						}
						options={backgroundColors}
						onChange={(option) => onChange('backgroundColor', option.value)}
					/>

					<Select
						title='Ширина контента'
						selected={
							contentWidthArr.find(
								(opt) => opt.value === values.containerWidth
							) || null
						}
						options={contentWidthArr}
						onChange={(option) => onChange('containerWidth', option.value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={onReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
