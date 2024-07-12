import { useEffect, useRef, useState } from "react";

import styles from "./App.module.scss";
import { INFO_MESSAGE, PRODUCTS, STATUS } from "./App.constants";
import { inputRegex } from "./App.constants";

import ControlPanel from "./components/ControlPanel";
import Items from "./components/Items";
import Wallet from "./components/Wallet";
import { calculateChange } from "./App.utils";
import Change from "./components/Change";
import clsx from "clsx";
import { Product } from "./App.types";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>();
  const [error, setError] = useState<any>();
  let timer: any;
  const changeRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    INFO_MESSAGE.ENTER
  );
  const [credit, setCredit] = useState(0);
  const [change, setChange] = useState<number[]>([]);
  const [infoMessage, setInfoMessage] = useState("");
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [selectedItem, setSelectedItem] = useState<Product>();
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(result.products || []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (status === STATUS.COMPLETED) {
      return;
    } else if (status === STATUS.INITIAL) {
      setInfoMessage(INFO_MESSAGE.ENTER);
      return;
    } else {
      if (inputRegex.test(selectedValue)) {
        if (+selectedValue > 15) {
          setInfoMessage(INFO_MESSAGE.INVALID);
        } else {
          const selectedItem = products!.find(
            (product) => product.id == +selectedValue
          );

          if (selectedItem!.price <= credit) {
            setCredit((prevCredit) => {
              const accCredit = +(prevCredit - selectedItem!.price).toFixed(2);
              setChange(calculateChange(accCredit));
              return accCredit;
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
    }

    timer = setTimeout(() => {
      if (status === STATUS.PREPEARING) {
        setStatus(STATUS.COMPLETED);
        setInfoMessage(INFO_MESSAGE.TAKE);
        scrollToBottomHandler();
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
  }, [credit]);

  const onDepositHandler = (amount: number) => {
    if (status === STATUS.INITIAL) {
      setChange([]);
      setStatus(STATUS.PENDING);
    }

    setCredit((prevCredit) => +(prevCredit + amount).toFixed(2));
  };

  const resetStateHandler = () => {
    setInfoMessage(INFO_MESSAGE.ENTER);
    setStatus(STATUS.INITIAL);
    setCredit(0);
  };

  const onResetClick = () => {
    if (credit) {
      const change = calculateChange(credit);
      setChange(change);
      resetStateHandler();
    }
  };

  const scrollToBottomHandler = () => {
    if (changeRef.current !== null) {
      changeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onResetError = () => {
    setProducts(PRODUCTS);
    setError(undefined);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div>
          <p>{error.message}</p>
          <button onClick={onResetError}>Continue with local data</button>
        </div>
      </div>
    );
  }

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
              items={products || []}
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
                    onClick={resetStateHandler}
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
              onResetClick={onResetClick}
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
