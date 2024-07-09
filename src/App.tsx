import styles from "./App.module.scss";

import { MOCK_DATA } from "./App.constants";
import Items from "./components/Items";
import ControlPanel from "./components/ControlPanel";

function App() {
  return (
    <div className={styles.container}>
      <section className={styles.vendingTopContainer}>
        <div className={styles.vendingTop}></div>
      </section>
      <div className={styles.vending}>
        <div className={styles.vending__content}>
          <div className={styles["vending__content--items"]}>
            <Items items={MOCK_DATA}></Items>
          </div>

          <div className={styles.door}>
            <h2>PUSH</h2>
          </div>
        </div>

        <div className={styles.vending__aside}>
          <div className={styles["vending__aside--logo"]}>
            <img src={"/images/logo.png"} alt="logo" />
          </div>

          <div className={styles.controlPanel}>
            <ControlPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
