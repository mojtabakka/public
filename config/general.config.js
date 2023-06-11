export const ORDER_STATUS = {
  notPayed: {
    value: "notPayed",
    text: "پرداخت نشده",
    progress: 0,
    color: "white",
  },
  payed: {
    value: "payed",
    text: "پرداخت شده",
    progress: 25,
    color: "orange",
  },

  preparing: {
    value: "preparing",
    text: "درحال اماده سازی",
    progress: 50,
    color: "yellow",
  },
  isSendig: {
    value: "isSending",
    text: "درحال ارسال",
    progress: 75,
    color: "blue",
  },
  completed: {
    value: "completed",
    text: "تکمیل شده",
    progress: 100,
    color: "green",
  },
};
