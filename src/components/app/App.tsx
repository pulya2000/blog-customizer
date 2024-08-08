import { useState, CSSProperties } from "react";
import { ArticleParamsForm } from "../article-params-form";
import { defaultArticleState } from "../../constants/articleProps";
import { Article } from "../article";

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {

	// Состояние для отображения статьи
	const [articleState, setArticleState] = useState(defaultArticleState);

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
				onApply={setArticleState}
			/>
			<Article />
		</main>
	);
};