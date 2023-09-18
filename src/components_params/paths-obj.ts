import logoImg from '#assets/icons/logo.svg';
import modalStateIconOk from '#assets/icons/state-icon-ok.svg';
import modalStateIconErr from '#assets/icons/state-icon-error.svg';

// interface PathsObj {
//   [pathName: string]: string;
// }

// interface PathsObj {
//   LOGO_IMG: string;
//   EMPTY_IMG: string;
//   EMPTY_PLACEHOLDER_IMG: string;
// }

// Record<'LOGO_IMG' | 'EMPTY_IMG' | 'EMPTY_PLACEHOLDER_IMG', string>

const PathsObj: Record<
  | 'LOGO_IMG'
  | 'EMPTY_IMG'
  | 'EMPTY_PLACEHOLDER_IMG'
  | 'MODAL_STATE_ICON_OK'
  | 'MODAL_STATE_ICON_ERR',
  string
> = {
  EMPTY_IMG: '',
  EMPTY_PLACEHOLDER_IMG:
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  LOGO_IMG: logoImg,
  MODAL_STATE_ICON_OK: modalStateIconOk,
  MODAL_STATE_ICON_ERR: modalStateIconErr,
} as const;

export default PathsObj;