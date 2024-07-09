import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import { MOCK_PRODUCTS } from "./App.constants";
import Items from "./components/Items";
import ControlPanel from "./components/ControlPanel";
import { inputRegex } from "./App.constants";

function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const [credit, setCredit] = useState(1.2);
  const [inputValue, setInputValue] = useState("Select product");

  useEffect(() => {
    if (inputRegex.test(selectedValue)) {
      if (+selectedValue > 15) {
        return;
      }

      const selectedItem = MOCK_PRODUCTS.find(
        (product) => product.id == +selectedValue
      );

      console.log(selectedItem);

      if (selectedItem!.price <= credit) {
        console.log("SUCCESS");
      } else {
        console.log("FAIL");
      }
    }
  });

  return (
    <div className={styles.container}>
      <section className={styles.vendingTopContainer}>
        <div className={styles.vendingTop}></div>
      </section>
      <div className={styles.vending}>
        <div className={styles.vending__content}>
          <div className={styles["vending__content--items"]}>
            <Items items={MOCK_PRODUCTS}></Items>
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
            <ControlPanel onSelectItem={(value) => setSelectedValue(value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
