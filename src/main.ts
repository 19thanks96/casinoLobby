// @ts-ignore
import '../styles/style.scss';
import {GameManager} from "./components/Controller/GameManager.ts";
const placeToIntegrate = document.querySelector('#place-to-integrate');
if (placeToIntegrate) {
    const gameManager = new GameManager();
    gameManager.init(placeToIntegrate as HTMLElement)
} else {
    console.error('placeToIntegrate not found');
}

