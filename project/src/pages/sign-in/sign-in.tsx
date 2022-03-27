import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { FormEvent, ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import classNames from 'classnames';
import styles from './sign-in.module.css';


const formFields = {
  email: 'Email address',
  password: 'Password',
};

type FieldProps = {
  value: string;
  error: boolean;
  errorText: string;
  regex: RegExp;
}

type FormStateProps = {
  [key: string]: FieldProps;
}

function SignIn(): JSX.Element {
  const [formState, setFormState] = useState<FormStateProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Введите корректный e-mail',
      regex: /^(\s*|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
    },
    password: {
      value: '',
      error: false,
      errorText: 'Пароль должен содержать минимум одну букву и одну цифру',
      regex: /[0-9]+[a-z]|[a-z]+[0-9]/,
    },
  });

  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const rule = formState[name].regex;
    const isValid = rule.test(value);
    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value: value,
        error: !isValid,
      },
    });
  };

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      login: formState.email.value,
      password: formState.password.value,
    });
  };

  const isDisabled = formState.email.error || formState.password.error || formState.email.value === '' || formState.password.value === '';

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            {Object.entries(formFields).map(([name, lable]) => {

              const inputClasses = classNames('sign-in__input', {
                [styles.error]: formState[name].error,
              });

              return (
                <div className="sign-in__field" key={name}>
                  <input
                    className={inputClasses}
                    type={name}
                    placeholder={lable}
                    name={name}
                    id={name}
                    value={formState[name].value}
                    onChange={handleChange}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor={name}>{lable}</label>
                  {formState[name].error
                    ? <p>{formState[name].errorText}</p>
                    : ''}
                </div>
              );
            })}
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" disabled={isDisabled}>Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
