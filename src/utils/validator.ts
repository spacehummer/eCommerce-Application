export default class Validator {
  public static readonly emailFilter = /^([a-zA-Z0-9_\s.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;

  public static readonly emailMsg = 'A valid email address is required.';

  public static email = (email: string): boolean => {
    return this.emailFilter.test(email);
  };

  public static readonly passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,32}$/;

  public static readonly passwordMsg =
    'Passwords must have at least 8 characters, 1 lowercase, 1 upper case, 1 number, and 1 special character.';

  public static password = (password: string): boolean => {
    if (password && password.length >= 8 && this.passwordRegex.test(password)) {
      return true;
    }
    return false;
  };
}
