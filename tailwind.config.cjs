/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "426px",
				sm: "641px",
				md: "769px",
				lg: "1025px",
				xl: "1281px",
				"2xl": "1536px",
			},
			colors: {
				coral: "#DC6453",
				grey: "#E8E3E3",
			},
			width: {
				500: "32rem",
				300: "19rem",
			},
			maxWidth: {
				500: "32rem",
			},
		},
	},
	plugins: [],
};
