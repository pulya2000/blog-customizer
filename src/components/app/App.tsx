import { useState, CSSProperties, FormEvent } from "react";
import { ArticleParamsForm } from "../article-params-form";
import { defaultArticleState,  ArticleStateType, OptionType } from "../../constants/articleProps";
import { Article } from "../article";

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {

	// Состояние для параметров статьи
	const [sideBarState, setSideBarState] = useState<ArticleStateType>(defaultArticleState);
	const [state, setState] = useState(defaultArticleState);

	// Обработчик изменения шрифта
	const handleFontFamilyChange = (select: OptionType) => {
		setSideBarState((prev: ArticleStateType) => ({
			...prev,
			fontFamilyOption: select,
		}));
	};

	// Обработчик изменения размера шрифта
	const handleFontSizeChange = (select: OptionType) => {
		setSideBarState((prev: ArticleStateType) => ({
			...prev,
			fontSizeOption: select,
		}));
	};

	// Обработчик изменения цвета шрифта
	const handleFontColorChange = (select: OptionType) => {
		setSideBarState((prev: ArticleStateType) => ({
			...prev,
			fontColor: select,
		}));
	};

	// Обработчик цвета фона
	const handleBackgroundColorChange = (select: OptionType) => {
		setSideBarState((prev: ArticleStateType) => ({
			...prev,
			backgroundColor: select,
		}));
	};

	// Обработчик изменения ширины контента
	const handleContentWidthChange = (select: OptionType) => {
		setSideBarState((prev: ArticleStateType) => ({
			...prev,
			contentWidth: select,
		}));
	};

	// Обработчик сброса параметров
	const handleResetButton = () => {
		setState(defaultArticleState);
		setSideBarState(defaultArticleState);
	};

	// Обработчик применения параметров
	const handleApplyButton = (event: FormEvent) => {
		event.preventDefault();
		setState(sideBarState);
	};

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': state.fontFamilyOption.value,
				'--font-size': state.fontSizeOption.value,
				'--font-color': state.fontColor.value,
				'--container-width': state.contentWidth.value,
				'--bg-color': state.backgroundColor.value,
			} as CSSProperties}
		>
			<ArticleParamsForm
				fontFamily={handleFontFamilyChange}
				fontSize={handleFontSizeChange}
				fontColor={handleFontColorChange}
				backgroundColor={handleBackgroundColorChange}
				contentWidth={handleContentWidthChange}
				resetButton={handleResetButton}
				applyButton={handleApplyButton}
				sideBarState={sideBarState}
			/>
			<Article />
		</main>
	);

};