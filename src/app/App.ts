import Header from '../components/containers/Header/Header';
import Footer from '../components/containers/Footer/Footer';

class App {
  static render(): void {
    const coreTemplate = `
      ${new Header().render()}
      <main class="main"></main>
      ${new Footer().render()}
    `;
    const body = document.querySelector('#app') as HTMLBodyElement;
    body.innerHTML = coreTemplate;
  }
}

export default App;
