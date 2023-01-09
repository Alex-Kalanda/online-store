import './Footer.style.scss';
import iconRSS from '../../../assets/svg/rs_school_js.svg';
import { LINK_TO_RSS_COURSE, PersonalInfo, YEAR_OF_DEV } from './Footer.const';

class Footer {
  public render(): string {
    return `
      <footer class="footer">
        <div class="footer__authors-wrapper">
          <a 
            class="footer__github" 
            href=${PersonalInfo.dev1.gitHub} 
            target="_blank"
            >
              : ${PersonalInfo.dev1.fullName}
            </a>
          <a 
            class="footer__github" 
            href=${PersonalInfo.dev2.gitHub} 
            target="_blank"
            >
              : ${PersonalInfo.dev2.fullName}
            </a>
        </div>
        <p class="footer__year">${YEAR_OF_DEV}</p>
        <a class="footer__rsschool" href=${LINK_TO_RSS_COURSE} target="_blank">
          <img src=${iconRSS} alt="RS School" />
        </a>
      </footer>
    `;
  }
}

export default Footer;
