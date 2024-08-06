import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';

import { useClose } from './hooks/useClose';
import clsx from 'clsx';
import {
	OptionType,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps ={
	fontFamily: (select: OptionType) => void,
	fontSize: (select: OptionType) => void,
	fontColor: (select: OptionType) => void,
	backgroundColor: (select: OptionType) => void,
	contentWidth: (select: OptionType) => void,
	resetButton: () => void,
	applyButton: (event: FormEvent) => void,
	sideBarState: ArticleStateType,
};

export const ArticleParamsForm = ({
	fontFamily,
	fontSize,
	fontColor,
	backgroundColor,
	contentWidth,
	resetButton,
	applyButton,
	sideBarState
}: ArticleParamsFormProps) => {

	const formRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const toggleForm = () => {
    	setIsOpen((prev) => !prev);
    };

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		// Очистка обработчика при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
				<aside ref={formRef} className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={applyButton} >
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
							onChange={fontFamily}
							title='шрифт'
						/>
						<RadioGroup
							name='fontsize'
							options={fontSizeOptions}
							selected={sideBarState.fontSizeOption}
							onChange={fontSize}
							title='размер шрифта'
						/>
						<Select
							selected={sideBarState.fontColor}
							options={fontColors}
							onChange={fontColor}
							title='цвет шрифта'
						/>
						<Separator />
						<Select
							selected={sideBarState.backgroundColor}
							options={backgroundColors}
							onChange={backgroundColor}
							title='цвет фона'
						/>
						<Select
							selected={sideBarState.contentWidth}
							options={contentWidthArr}
							onChange={contentWidth}
							title='ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='button' onClick={resetButton} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
		</>
	);
};
