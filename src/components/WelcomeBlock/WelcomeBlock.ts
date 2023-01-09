import './WelcomeBlock.style.scss';
import background from '../../assets/img/background_main.jpg';

const GREETINGS = 'WELCOME TO CHRISTMAS SHOP';
const SUBTITLE = 'ADD SOME SPARKLE TO ';
const SUBTITLE_HIGHLIGHTED_TEXT = 'Christmas';
const BUTTON_SHOP = 'SHOP NOW';

class WelcomeBlock {
  render(): string {
    return `
        <section class="shopnow">
            <img class="shopnow__background" src=${background} alt="background shop now">
            <h1 class="h1 shopnow__title">${GREETINGS}</h1>
            <div class="shopnow__subtitle">
                ${SUBTITLE}
                <span class="shopnow__subtitle_red">${SUBTITLE_HIGHLIGHTED_TEXT}</span>
            </div>
            <a class="shopnow__button" href="#products-main">${BUTTON_SHOP}</a>
        </section>
        `;
  }
}

export default WelcomeBlock;
