const modalWindowViewERRHeading = 'ERROR: In ModalWindowView:';

interface ModalWindowViewErrors {
  CONTAINER_INSTANCE_INCORRECT: () => Error;
}

interface Errors {
  MODAL_WINDOW_VIEW: ModalWindowViewErrors;
}

const errors: Errors = {
  MODAL_WINDOW_VIEW: {
    CONTAINER_INSTANCE_INCORRECT: (): Error => {
      return new Error(
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.container\`` +
          `must be an instance of the BasicComponent!`
      );
    },
  },
};

export default errors;
