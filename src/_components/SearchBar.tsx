import { Btn } from "../ui/Btn";
import { Icon } from "../ui/Icons";
import { Input } from "../ui/Input";

export const SearchBar = () => {
	return (
		<div className=" flex">
			<Input
				type="text"
				placeholder="search"
				className="border-b-2  border-neutral-revert "
			/>
			<Btn className="size-10 p-0 ">
				<Icon.search className="size-6 fill-neutral-revert" />
			</Btn>
		</div>
	);
};
