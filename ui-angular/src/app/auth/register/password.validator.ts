import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  console.log('passwordValidator');
  console.log(control.errors);
  return password.value &&
    confirmPassword.value &&
    password.value !== confirmPassword.value
    ? { passwordMisMatch: true }
    : null;
};

export default passwordValidator;
