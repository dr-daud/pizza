import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

type OnChangeType = {
	onChangePage: (page: number) => void;
};

const Pagination = ({ onChangePage }: OnChangeType) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
