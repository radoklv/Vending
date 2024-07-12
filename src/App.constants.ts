export const inputRegex = /^\d+$/; //Regex for numbers only

export enum STATUS {
  INITIAL = "initial",
  PENDING = "pending",
  PREPEARING = "prepearing",
  COMPLETED = "completed",
}

export enum INFO_MESSAGE {
  ENTER = "Enter money",
  SELECT = "Select product",
  TAKE = "Please take the product ",
  INVALID = "Invalid product",
  ONE_MOMENT = "One moment please",
  TAKE_CHANGE = "Please take change"
}

export const PRODUCTS = [
  {
    id: 1,
    name: "7UP Cherry",
    imageName: "7up-cherry.png",
    price: 1.4,
  },
  {
    id: 2,
    name: "Bubbly Limey",
    imageName: "bubbly-lime.png",
    price: 1.2,
  },
  {
    id: 3,
    name: "Bubbly Mango",
    imageName: "bubbly-mango.png",
    price: 1.2,
  },
  {
    id: 4,
    name: "Bubbly",
    imageName: "bubbly.png",
    price: 1.1,
  },
  {
    id: 5,
    name: "Coke Zero",
    imageName: "coke-zero.png",
    price: 1.5,
  },
  {
    id: 6,
    name: "Coke",
    imageName: "coke.png",
    price: 1.5,
  },
  {
    id: 7,
    name: "Dr. Pepper",
    imageName: "dr-pepper.png",
    price: 1.4,
  },
  {
    id: 8,
    name: "Fanta Pine",
    imageName: "fanta-pine.png",
    price: 1.4,
  },
  {
    id: 9,
    name: "Mccol",
    imageName: "mccol.png",
    price: 1.1,
  },
  {
    id: 10,
    name: "Mirinda",
    imageName: "mirinda.png",
    price: 1.25,
  },
  {
    id: 11,
    name: "Pepsi Diet",
    imageName: "pepsi-diet.png",
    price: 1.35,
  },
  {
    id: 12,
    name: "Pepsi",
    imageName: "pepsi.png",
    price: 1.35,
  },
  {
    id: 13,
    name: "Pocari",
    imageName: "pocari.png",
    price: 1.45,
  },
  {
    id: 14,
    name: "Root Beer",
    imageName: "root-beer.png",
    price: 1.8,
  },
  {
    id: 15,
    name: "sierra-mist",
    imageName: "sierra-mist.png",
    price: 1.85,
  },
];
