import { App } from "./app"; //importo la clase App

async function main() {
    const app = new App(3000);
    await app.listen();
}

main();