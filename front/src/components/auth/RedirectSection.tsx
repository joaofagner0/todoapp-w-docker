import { useRouter } from "next/navigation";

type RedirectSessionProps = {
	text: string;
	linkText: string,
	route: string;
};

const RedirectSession = ({ text, linkText, route }: RedirectSessionProps) => {
	const router = useRouter();

	return (
		<div className="mt-4 text-center">
			<p className="text-gray-300">{text}{" "}
				<button
					onClick={() => router.push(route)}
					className="text-indigo-500 hover:text-indigo-300 transition duration-300 font-semibold"
				>
					{linkText}
				</button>
			</p>
		</div>
	);
};

export default RedirectSession;
