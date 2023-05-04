// @refresh reload
import { Suspense } from "solid-js";
import {
	useLocation,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start";
import { I18nContext, createI18nContext } from "@solid-primitives/i18n";
import "./root.css";
import locales from "./core/locales.json";

export default function Root() {
	const value = createI18nContext(locales, "es");

	return (
		<Html lang="es">
			<I18nContext.Provider value={value}>
				<Head>
					<Title>VotoSeguro</Title>
					<Meta charset="utf-8" />
					<Meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
				</Head>
				<Body>
					<Suspense>
						<ErrorBoundary>
							<Routes>
								<FileRoutes />
							</Routes>
						</ErrorBoundary>
					</Suspense>
					<Scripts />
				</Body>
			</I18nContext.Provider>
		</Html>
	);
}
