import { Menu } from "./Menu";
import { SearchBar } from "./SearchBar";

export const Header = () => {
	return (
		<header className=" absolute top-0 left-0 px-4 gap-4 z-10 justify-around   h-20 border-b-2 border-neutral-revert  bg-neutral flex  w-full items-center     ">
			<Menu />
			<SearchBar />
		</header>
	);
};
