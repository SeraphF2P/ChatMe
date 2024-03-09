import { ChatBtn } from "../../_components/ChatBtn";
import { ChatRoom } from "../../_components/ChatRoom";
import { Header } from "../../_components/Header";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Home() {
	const { user } = useAuthContext();
	return (
		<section className="md:overflow-hidden bg-neutral rounded-lg relative  md:h-[600px] md:m-auto w-full md:w-[700px] lg:w-[800px]  h-screen  flex     ">
			<div className="  relative w-full md:w-[320px]">
				<Header />
				<div className=" remove-scroll-bar pt-20   overflow-y-scroll h-full divide-neutral-revert divide-y-2">
					{user?.chats &&
						user.chats.map((chatId) => {
							return <ChatBtn chatId={chatId} />;
						})}
				</div>
			</div>
			<ChatRoom />
		</section>
	);
}
