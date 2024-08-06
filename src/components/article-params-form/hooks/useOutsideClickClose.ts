import { useEffect } from 'react';

type TUseOutsideClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: TUseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, isOpen, rootRef]);
};