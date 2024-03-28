#!/usr/bin/env node

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const exitString = `\x1b[1mThank you for using GenAI on the terminal. Checkout https://devgg.me for more amazing things :D  \x1b[0m`


async function run(context = "") {
	if (context.trim() == "") return '"Please enter something!"';
	try {
		const url = "https://llamastudio.dev/api/clu9je3wp0001l908f1tlpixw";
		const input = { input: context };

		let response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(input),
		});
		if (!response.ok) {
			throw new Error();
		}
		const data = await response.text();
		return data;
	} catch (error) {
		console.log("AI: Something went wrong here.");
		chat();
	}
}
function unescapeString(inputString) {
	return inputString.replace(/\\n/g, '\n    ')
		.replace(/\\t/g, '\t')
		.replace(/\\'/g, '\'')
		.replace(/\\"/g, '\"')
		.replace(/\\\\/g, '\\');
}


function chat() {
	rl.resume()
	rl.question("\nYou: ", async (userInput) => {
		if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "bye") {
			rl.close(); console.log(exitString);
		} else {
			rl.pause()
			let res = await run(userInput);
			const guardString = res.toString().substring(1, res.length - 1);
			const formattedString = unescapeString(guardString);
			console.log("\x1b[34mAI:\x1b[0m", formattedString);
			chat();
		}
	});

}
console.log(`\x1b[34m
████████╗███████╗██████╗ ███╗   ███╗  █████╗ ██╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║ ██╔══██╗██║
   ██║   █████╗  ██████╔╝██╔████╔██║ ███████║██║
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║ ██╔══██║██║
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║ ██║  ██║██║
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═╝  ╚═╝╚═╝
  \x1b[0m                                             
`)
console.log(`\x1b[1mWelcome to GEN AI on the terminal. To stop type 'exit' or 'bye'\x1b[0m`);
console.log(`\x1b[1mDisclaimer: AI replies are generated by Gemini and not custom trained. Please use AI responsibly!\x1b[0m`);
chat(); // Start the chat
