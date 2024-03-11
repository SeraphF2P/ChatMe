import { ChatsSection } from "../../_components/ChatsSection";
import { Header } from "../../_components/Header";
import { OffCanves } from "../../_components/OffCanvas";
import { UserProvider } from "../../contexts/UserProvider";

export default function Home() {
	return (
		<UserProvider>
			<main className="md:overflow-hidden bg-neutral rounded-lg relative  md:h-[600px] md:m-auto w-full md:w-[700px] lg:w-[800px]  h-screen  flex     ">
				<div className="  relative w-full md:w-[320px]">
					<Header />
					<ChatsSection />
				</div>
				<OffCanves />
			</main>
		</UserProvider>
	);
}
