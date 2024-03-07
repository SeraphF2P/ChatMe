import { Menu } from "./Menu";
import { SearchBar } from "./SearchBar";

export const Header = () => {
	return (
		<header className=" absolute top-0 left-0 z-10   h-20 border-b-2 border-neutral-revert  bg-neutral flex justify-center w-full items-center     ">
			<div className="flex p-4 justify-between items-center  w-full sm:px-8 md:px-4  gap-4">
				<Menu />
				<SearchBar />
			</div>
		</header>
	);
};
