import logoImg from '#assets/icons/logo.svg';

// interface PathsObj {
//   [pathName: string]: string;
// }

// interface PathsObj {
//   LOGO_IMG: string;
//   EMPTY_IMG: string;
//   EMPTY_PLACEHOLDER_IMG: string;
// }

// Record<'LOGO_IMG' | 'EMPTY_IMG' | 'EMPTY_PLACEHOLDER_IMG', string>

const PathsObj: Record<'LOGO_IMG' | 'EMPTY_IMG' | 'EMPTY_PLACEHOLDER_IMG', string> = {
  LOGO_IMG: logoImg,
  EMPTY_IMG: '',
  EMPTY_PLACEHOLDER_IMG:
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
};

export default PathsObj;
