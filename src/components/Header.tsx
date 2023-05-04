import { useI18n } from "@solid-primitives/i18n";
import { Link } from "~/core/types/Link";
import { useLocation, A } from "solid-start";
import { createSignal } from "solid-js";
import { c } from "~/core/utils/c";

const Header = () => {
	const [t] = useI18n();
	const location = useLocation();
	const [hoverLogin, setHoverLogin] = createSignal(false);

	/* const active = (path: string) =>
		path == location.pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600"; */

	const hoverHandler = {
		onmouseover: () => setHoverLogin(true),
		onmouseleave: () => setHoverLogin(false),
	};

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
				<A href="/">
					<p class="text-2xl hover:font-bold hover:scale-110 hover:text-coral transition-all">{t("header.title")}</p>
				</A>
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
					<a
						href="/votaciones"
						class={c(
							"text-center border-coral border py-2 px-6 transition-colors duration-300",
							`${
								index === 0
									? hoverLogin()
										? "bg-coral text-white"
										: "bg-white text-black"
									: ""
							} `,
							`${
								index === 1
									? !hoverLogin()
										? "bg-coral text-white"
										: "bg-white text-black"
									: ""
							} `,
						)}
						{...(index === 0 ? hoverHandler : {})}
					>
						{item.name}
					</a>
				))}
			</div>
		</header>
	);
};

export default Header;
