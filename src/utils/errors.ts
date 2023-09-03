const modalWindowViewERRHeading = 'ERROR: In ModalWindowView:';

interface Errors {
  MODAL_WINDOW_VIEW: () => Error;
}

const errors: Errors = {
  MODAL_WINDOW_VIEW: (): Error => {
    return new Error(
      `${modalWindowViewERRHeading} \`ModalWindowView.prototype.container\` must be an instance of the BasicComponent!`
    );
  },
};

export default errors;
