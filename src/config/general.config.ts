export const ORDER_STATUS = {
  notPayed: {
    value: "notPayed",
    text: "پرداخت نشده",
    progress: 0,
    color: "red",
  },
  payed: {
    value: "payed",
    text: "پرداخت شده",
    progress: 25,
    color: "#6FADFA",
  },

  preparing: {
    value: "preparing",
    text: "درحال اماده سازی",
    progress: 59,
    color: "#BAF7D0",
  },
  isSendig: {
    value: "isSending",
    text: "درحال ارسال",
    progress: 75,
    color: "#49DE80",
  },
  completed: {
    value: "completed",
    text: "تکمیل شده",
    progress: 100,
    color: "#16A349",
  },
};
