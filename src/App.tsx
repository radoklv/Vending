import { useEffect, useRef, useState } from "react";

import styles from "./App.module.scss";
import { INFO_MESSAGE, MOCK_PRODUCTS, STATUS } from "./App.constants";
import { inputRegex } from "./App.constants";

import ControlPanel from "./components/ControlPanel";
import Items from "./components/Items";
import Wallet from "./components/Wallet";
import { calculateChange } from "./App.utils";
import Change from "./components/Change";
import clsx from "clsx";
import { Item } from "./App.types";

function App() {
  const changeRef = useRef<HTMLDivElement>(null);
  let timer: any;
  const [selectedValue, setSelectedValue] = useState<string>(
    INFO_MESSAGE.ENTER
  );
  const [credit, setCredit] = useState(0);
  const [change, setChange] = useState<number[]>([]);
  const [infoMessage, setInfoMessage] = useState("");
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  useEffect(() => {
    if (status === STATUS.COMPLETED) {
      return;
    } else if (status === STATUS.INITIAL) {
      setInfoMessage(INFO_MESSAGE.ENTER);
    } else {
      if (inputRegex.test(selectedValue)) {
        if (+selectedValue > 15) {
          setInfoMessage(INFO_MESSAGE.INVALID);
          return;
        }

        const selectedItem = MOCK_PRODUCTS.find(
          (product) => product.id == +selectedValue
        );

        if (selectedItem!.price <= credit) {
          setCredit((credit) => {
            const updatedCredit = +(credit - selectedItem!.price).toFixed(2);
            const change = calculateChange(updatedCredit);
            setChange(change);
            return updatedCredit;
          });

          setSelectedItem(selectedItem);
          setStatus(STATUS.PREPEARING);
          setInfoMessage(INFO_MESSAGE.ONE_MOMENT);
          return;
        } else {
          setInfoMessage(`Credit: ${credit}`);
        }
      }
    }

    timer = setTimeout(() => {
      if (status === STATUS.PREPEARING) {
        setStatus(STATUS.COMPLETED);
        setInfoMessage(INFO_MESSAGE.TAKE);
      }

      if (status === STATUS.PENDING) {
        setInfoMessage("");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedValue]);

  useEffect(() => {
    if (status === STATUS.COMPLETED) {
      return;
    }

    if (status === STATUS.PENDING) {
      setInfoMessage(`Credit: ${credit.toFixed(2)}`);

      timer = setTimeout(() => {
        setInfoMessage("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [credit, status]);

  useEffect(() => {
    console.log(change);
  }, [change]);

  const onDepositHandler = (amount: number) => {
    if (status === STATUS.INITIAL) {
      setStatus(STATUS.PENDING);
    }

    setCredit((credit) => +(credit + amount).toFixed(2));
  };

  const onResetHandler = () => {
    setStatus(STATUS.INITIAL);
    setInfoMessage(INFO_MESSAGE.ENTER);
    setCredit(0);
  };

  const scrollToBottomHandler = () => {
    if (changeRef.current !== null) {
      changeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <Wallet onSelectAmount={(amount) => onDepositHandler(amount)} />

      <section className={styles.vendingTopContainer}>
        <div className={styles.vendingTop}></div>
      </section>

      <div className={styles.vending}>
        <div className={styles.vending__content}>
          <div className={styles["vending__content--items"]}>
            <Items
              items={MOCK_PRODUCTS}
              selectedItemId={selectedItem?.id}
              status={status}
            ></Items>
          </div>

          <div
            className={styles.door}
            onMouseEnter={() => setIsDoorOpen(true)}
            onMouseLeave={() => setIsDoorOpen(false)}
          >
            {isDoorOpen ? (
              <div className={clsx(styles.door, styles["door--opened"])}>
                {status === STATUS.COMPLETED && (
                  <img
                    src={`/images/products/${selectedItem?.imageName}`}
                    alt="product"
                    onClick={onResetHandler}
                  />
                )}
              </div>
            ) : (
              <div className={clsx(styles.door, styles["door--closed"])}>
                <h2>PUSH</h2>
              </div>
            )}
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
              status={status}
              change={change}
              onChangeClick={scrollToBottomHandler}
            />
          </div>
        </div>
      </div>

      <div className={styles.change} ref={changeRef}>
        {change.length ? (
          <Change change={change} onTakeChange={() => setChange([])} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
