import styles from './error.module.css';

function Error(): JSX.Element {

  return (
    <div className={styles.container}>
      <p>Ooops... Something went wrong :(</p>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
