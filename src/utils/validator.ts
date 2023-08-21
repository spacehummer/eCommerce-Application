export default class Validator {
  public static readonly emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/i;

  public static readonly emailMsg = 'A valid email address is required.';

  public static email = (email: string): boolean => {
    return this.emailRegex.test(email);
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

  public static readonly nameRegex = /^[A-Z]{1,}[a-z]*$/i;

  public static readonly nameMsg =
    'Must contain at least one character and no special characters or numbers';

  public static readonly streetRegex = /^[A-Za-z]*$/i;

  public static readonly streetMsg =
    'Must contain at least one character and no special characters or numbers';
}
