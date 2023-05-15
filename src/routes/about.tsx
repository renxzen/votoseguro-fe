import { A } from "solid-start";
import Counter from "~/components/Counter";

export default function AboutPage() {
	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
				About Page
			</h1>
			<Counter />
			<p class="mt-8"></p>
			<p class="my-4">
				<A
					href="/"
					class="text-sky-600 hover:underline"
				>
					Home
				</A>
			</p>
		</main>
	);
}
