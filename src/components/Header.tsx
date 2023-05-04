import { useI18n } from "@solid-primitives/i18n";
import { Link } from "~/core/types/Link";
import { useLocation, A } from "solid-start";

const Header = () => {
	const [t] = useI18n();
	const location = useLocation();
	const active = (path: string) =>
		path == location.pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600";

	return (
		<header class="flex justify-between px-9 py-4">
			{/* <nav class="bg-sky-800">
				<ul class="container flex items-center p-3 text-gray-200">
					<li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
						<A href="/">Home</A>
					</li>
					<li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
						<A href="/about">About</A>
					</li>
				</ul>
			</nav> */}
			<div class="flex items-center gap-12">
				<p class="text-2xl">{t("header.title")}</p>
				<ul class="hidden md:flex gap-6">
					{t("header.subpages").map((item: Link) => (
						<li class="hover:text-coral">
							<A href="/">{item.name}</A>
						</li>
					))}
				</ul>
			</div>
			<div class="hidden md:grid grid-cols-2 auto-rows-fr ">
				{t("header.buttons").map((item: Link, index: number) => (
					<button
						class={`border-coral border-[1px] ${index !== 0 ? "bg-coral text-white" : ""
							} py-2 px-6`}
					>
						{item.name}
					</button>
				))}
			</div>
		</header>
	);
};

export default Header;
