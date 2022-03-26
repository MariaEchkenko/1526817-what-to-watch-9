import styles from './loader.module.css';


function Loader(): JSX.Element {
  return (
    <div className={styles.container}>
      <p>Loading ...</p>
      <div className={styles.dualRing} ></div>
    </div>
  );
}

export default Loader;
