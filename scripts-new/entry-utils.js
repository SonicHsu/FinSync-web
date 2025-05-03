export const typeColorMap = {
    expense: "bg-gray-400/50",
    income: "bg-blue-400/50"
}

export const categoryMap = {
    food: {
        color: "bg-orange-400",
        label: "飲食",
    },
    transport: {
        color: "bg-sky-400",
        label: "交通",
    },
    housing: {
        color: "bg-emerald-400",
        label: "住房",
    },
    entertainment: {
        color: "bg-pink-400",
        label: "娛樂",
    },
    life: {
        color: "bg-purple-400",
        label: "生活",
    },
    other: {
        color: "bg-gray-400",
        label: "其他",
    }
};

export function setColorClass(element, newColorClass) {
    for (const cls of element.classList) {
      if (cls.startsWith("bg-")) {
        element.classList.remove(cls);
      }
    }
    element.classList.add(newColorClass);
  }