import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({ onApply }: { onApply: (state: ArticleStateType) => void }) => {

	const formRef = useRef<HTMLFormElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sideBarState, setSideBarState] = useState<ArticleStateType>(defaultArticleState);

	const toggleForm = () => {
    	setIsOpen((prev) => !prev);
    };

	useOutsideClickClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	// Обработчик изменения состояния
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setSideBarState((prev) => ({ ...prev, [field]: value }));
		};
	};

	// Обработчик сброса параметров
	const handleResetButton = () => {
		setSideBarState(defaultArticleState);
		onApply(defaultArticleState);
	};

	// Обработчик применения параметров
	const handleApplyButton = (event: FormEvent) => {
		event.preventDefault();
		onApply(sideBarState);
	};

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
				<aside className={clsx(styles.container, {[styles.container_open] : isOpen})}>
					<form ref={formRef} className={styles.form} onSubmit={handleApplyButton} >
						<Text
							size = {31}
							weight = {800}
							uppercase
							as = {'h3'}
						>
							Задайте параметры
						</Text>
						<Select
							selected={sideBarState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOnChange('fontFamilyOption')}
							title='шрифт'
						/>
						<RadioGroup
							name='fontsize'
							options={fontSizeOptions}
							selected={sideBarState.fontSizeOption}
							onChange={handleOnChange('fontSizeOption')}
							title='размер шрифта'
						/>
						<Select
							selected={sideBarState.fontColor}
							options={fontColors}
							onChange={handleOnChange('fontColor')}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							selected={sideBarState.backgroundColor}
							options={backgroundColors}
							onChange={handleOnChange('backgroundColor')}
							title='цвет фона'
						/>
						<Select
							selected={sideBarState.contentWidth}
							options={contentWidthArr}
							onChange={handleOnChange('contentWidth')}
							title='ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleResetButton} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
		</>
	);
};
