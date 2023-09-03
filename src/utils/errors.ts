const modalWindowViewERRHeading = 'ERROR: In ModalWindowView:';

// interface ModalWindowViewErrors {
//   CONTAINER_INSTANCE_INCORRECT: (giveText?: boolean) => Error | string;
//   CONFIG_TYPE_INCORRECT: (giveText?: boolean) => Error | string;
//   CONFIG_STATUS_INCORRECT: (giveText?: boolean) => Error | string;
// }
//
// interface Errors {
//   MODAL_WINDOW_VIEW: ModalWindowViewErrors;
// }

// function dependsOnParameter<B extends boolean>(x: B): B extends true ? number : string;
// function dependsOnParameter(x: boolean): number | string {
//   return x ? 3 : 'string';
// }

function containerInstanceIncorrect(giveText?: false): Error;
function containerInstanceIncorrect(giveText: true): string;
function containerInstanceIncorrect(giveText?: boolean): string | Error;
function containerInstanceIncorrect(giveText?: boolean): string | Error {
  const text =
    `${modalWindowViewERRHeading} \`ModalWindowView.prototype.container\`` +
    `must be an instance of the BasicComponent!`;
  return giveText ? new Error(text) : text;
}

const errors = {
  MODAL_WINDOW_VIEW: {
    containerInstanceIncorrect,
    CONFIG_TYPE_INCORRECT: (giveText = false): Error | string => {
      const text =
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.modalWindowConfig.type\`` +
        `has an incorrect value!`;
      return giveText ? new Error(text) : text;
    },
    CONFIG_STATUS_INCORRECT: (giveText = false): Error | string => {
      const text =
        `${modalWindowViewERRHeading} \`ModalWindowView.prototype.modalWindowConfig.status\`` +
        `has an incorrect value!`;
      return giveText ? new Error(text) : text;
    },
  },
};

export default errors;
