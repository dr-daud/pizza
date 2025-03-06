import ContentLoader from "react-content-loader";

import "../pizza-block/pizza-block.scss";

const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="140" cy="130" r="125" />
		<rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
		<rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="430" rx="10" ry="10" width="90" height="27" />
		<rect x="130" y="415" rx="20" ry="20" width="151" height="45" />
	</ContentLoader>
);

export default Skeleton;
