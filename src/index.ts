// <editor-fold desc="Imports">

/* Import styles */
import '../assets/styles/general.css';
import '../assets/styles/normalize.css';

/* Import classes */
import BasicComponent from '#src/components/basic-component';
import checkInstance from '#src/utils/utils';

// </editor-fold desc="Imports">

/**
 * Onload work function: entry point for most code.
 */
function windowOnLoadWork(): void {
  const helloWorld = new BasicComponent({
    tagName: 'div',
    classNames: ['demo-container'],
    textContent: 'Hello world!',
    callback: (e): void => {
      if (e instanceof Event) {
        checkInstance(e.target, HTMLElement).classList.toggle('demo-red');
      }
    },
  });
  console.log(document.getElementsByTagName('body'));
  const root = checkInstance(document.getElementsByTagName('body')[0], HTMLElement);
  root.append(checkInstance(helloWorld.getElement(), HTMLElement));
}

/* Start onload work */
window.addEventListener('load', () => {
  windowOnLoadWork();
});
