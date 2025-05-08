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
    expenseOther: {
        color: "bg-gray-400",
        label: "其他",
    },

    salary: {
        color: "bg-yellow-400",
        label: "薪資",
    },
    bonus: {
        color: "bg-green-400",
        label: "獎金",
    },
    investment: {
        color: "bg-indigo-400",
        label: "投資",
    },
    incomeOther: {
        color: "bg-neutral-400",
        label: "其他",
    },
};

export function setColorClass(element, newColorClass) {
    for (const cls of element.classList) {
        if (cls.startsWith("bg-")) {
            element.classList.remove(cls);
        }
    }
    element.classList.add(newColorClass);
}

export function initEntryOptionSelector(parent, selector, dataKey, defaultClass, selectedClass, eventName, syncCategoryByType = false) {
    const buttons = parent.querySelectorAll(selector);
    let defaultButton = null;

    for (const button of buttons) {
        if (button.classList.contains(selectedClass)) {
            defaultButton = button;
        }

        button.addEventListener("click", () => {
            const value = button.dataset[dataKey];
            setSelected(value, true);
        });
    }

    function resetToDefault() {
        if (!defaultButton) return;
        setSelected(defaultButton.dataset[dataKey]);
    }

    function setSelected(value, triggerByClick = false) {
        for (const btn of buttons) {
          const isSelected = btn.dataset[dataKey] === value;
      
          btn.classList.toggle(defaultClass, !isSelected);
          btn.classList.toggle(selectedClass, isSelected);
      
          if (isSelected && (triggerByClick || syncCategoryByType)) {
            btn.dispatchEvent(new CustomEvent(eventName, {
              detail: {
                key: dataKey,
                value: value,
              },
              bubbles: true
            }));
          }
        }
      }

    return {
        resetToDefault,
        setSelected,
    };
}



function hideAllCategoryLists(categoryListsByType) {
  for (const list of Object.values(categoryListsByType)) {
    list.classList.add("hidden");
  }
}

export function resetEntryForm(selectors, categoryListsByType, defaultEntryType = "expense") {
    const {
      entryAmountInput,
      entryNoteInput,
      typeSelector,
      expenseSelector,
      incomeSelector,
      modeSelector,
    } = selectors;
  
    // 重設輸入欄位
    entryAmountInput.value = "";
    entryNoteInput.value = "";
  
    // 重設所有選擇器
    typeSelector.resetToDefault();
    expenseSelector.resetToDefault();
    incomeSelector.resetToDefault();
    modeSelector.resetToDefault();
  
    // 顯示預設分類清單
    hideAllCategoryLists(categoryListsByType);
    categoryListsByType[defaultEntryType].classList.remove("hidden");
  }

export function initCategorySwitcher(entryFormElement, categoryListsByType) {
  entryFormElement.addEventListener("entryTypeChange", (event) => {
    const { value } = event.detail;
    hideAllCategoryLists(categoryListsByType);
    categoryListsByType[value].classList.remove("hidden");
  });
}