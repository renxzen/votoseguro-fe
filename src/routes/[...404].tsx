import { A } from "solid-start";

export default function NotFoundPage() {
	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
				No se encontró
			</h1>
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
