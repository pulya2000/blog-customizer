import { useState, CSSProperties } from "react";
import { ArticleParamsForm } from "../article-params-form";
import { defaultArticleState, ArticleStateType } from "../../constants/articleProps";
import { Article } from "../article";

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {

	// Состояние для отображения статьи
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleApplyButton = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': articleState.fontFamilyOption.value,
				'--font-size': articleState.fontSizeOption.value,
				'--font-color': articleState.fontColor.value,
				'--container-width': articleState.contentWidth.value,
				'--bg-color': articleState.backgroundColor.value,
			} as CSSProperties}
		>
			<ArticleParamsForm
				onApply={handleApplyButton}
			/>
			<Article />
		</main>
	);
};