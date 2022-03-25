import styles from './loading-screen.module.css';


function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <p>Loading ...</p>
      <div className={styles.dualRing} ></div>
    </div>
  );
}

export default LoadingScreen;
