import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import { MOCK_PRODUCTS } from "./App.constants";
import { inputRegex } from "./App.constants";

import ControlPanel from "./components/ControlPanel";
import Items from "./components/Items";
import Wallet from "./components/Wallet";

function App() {
  const [selectedValue, setSelectedValue] = useState("");
  const [credit, setCredit] = useState(0);
  const [infoMessage, setInfoMessage] = useState("");
  const [keybordBlocked, setKeyboardBlocked] = useState(false);

  useEffect(() => {
    if (inputRegex.test(selectedValue)) {
      if (+selectedValue > 15) {
        setInfoMessage("Invalid product");
        return;
      }

      const selectedItem = MOCK_PRODUCTS.find(
        (product) => product.id == +selectedValue
      );

      if (selectedItem!.price <= credit) {
        setCredit((credit) => credit - selectedItem!.price);
        setInfoMessage("Take product");
      } else {
        setInfoMessage(`Credit: ${credit}`);
      }
    }

    let timer = setTimeout(() => {
      setInfoMessage("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedValue]);

  useEffect(() => {
    setInfoMessage(`Credit: ${credit.toFixed(2)}`);

    let timer = setTimeout(() => {
      setInfoMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [credit]);

  return (
    <div className={styles.container}>
      <Wallet
        onSelectAmount={(amount: number) =>
          setCredit((credit) => credit + +amount)
        }
      />

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
            <ControlPanel
              onSelectItem={(value) => setSelectedValue(value)}
              infoMessage={infoMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
