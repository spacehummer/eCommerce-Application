const modalWindowViewERRHeading = 'ERROR: In ModalWindowView:';

interface ModalWindowViewErrors {
  CONTAINER_INSTANCE_INCORRECT: () => string;
  CONFIG_TYPE_INCORRECT: () => string;
  CONFIG_STATUS_INCORRECT: () => string;
  CLOSE_BTN_INCORRECT: (curValue: string) => string;
}

interface Errors {
  MODAL_WINDOW_VIEW: ModalWindowViewErrors;
}

const errors: Errors = {
  MODAL_WINDOW_VIEW: {
    CONTAINER_INSTANCE_INCORRECT: (): string => {
      return (
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.container\`` +
        `must be an instance of the BasicComponent!`
      );
    },
    CONFIG_TYPE_INCORRECT: (): string => {
      return (
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.modalWindowConfig.type\`` +
        `has an incorrect value!`
      );
    },
    CONFIG_STATUS_INCORRECT: (): string => {
      return (
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.modalWindowConfig.status\`` +
        `has an incorrect value!`
      );
    },
    CLOSE_BTN_INCORRECT: (curValue): string => {
      return (
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.closeBtn\`` +
        `has an incorrect value! Current value: ${curValue}.`
      );
    },
  },
};

export default errors;
