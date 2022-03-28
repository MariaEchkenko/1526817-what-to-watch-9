import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { FormEvent, ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
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
  const dispatch = useAppDispatch();

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

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction({
      login: formState.email.value,
      password: formState.password.value,
    }));
  };

  const isDisabled = Object.values(formState).some((key) => key.error) || Object.values(formState).some((key) => key.value === '');
  const errorField = Object.values(formState).find((value) => (value.error));

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
          {errorField &&
            <div className="sign-in__message">
              <p>{errorField.errorText}</p>
            </div>}
          <div className="sign-in__fields">
            {Object.entries(formFields).map(([name, label]) => {

              const inputClasses = classNames('sign-in__input', {
                [styles.error]: formState[name].error,
              });

              return (
                <div className="sign-in__field" key={name}>
                  <input
                    className={inputClasses}
                    type={name}
                    placeholder={label}
                    name={name}
                    id={name}
                    value={formState[name].value}
                    onChange={handleChange}
                  />
                  <label className="sign-in__label visually-hidden" htmlFor={name}>{label}</label>
                </div>
              );
            })}
          </div>
          <div className="sign-in__submit">
            <button
              className={classNames('sign-in__btn', {
                [styles.disabled]: isDisabled,
              })}
              type="submit"
              disabled={isDisabled}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
