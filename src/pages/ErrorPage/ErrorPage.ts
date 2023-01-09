import './ErrorPage.style.scss';
import getMainBlock from '../../utils/getMainBlock';

const MESSAGE_ERROR = 'PAGE NOT FOUND (404)';

class ErrorPage {
  static render() {
    const main = getMainBlock();

    main.innerHTML = `
        <section class="error">
          <div>
            ${MESSAGE_ERROR}
          </div>
        </section>
    `;
  }
}

export default ErrorPage;
