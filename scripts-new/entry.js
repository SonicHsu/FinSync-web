const entryTemplateElement = document.querySelector("[data-template ='entry']");

export function initEntry(parent, entry) {
    const entryContent = entryTemplateElement.content.cloneNode(true);
    const entryElement = entryContent.querySelector("[data-entry]");
    const entryCategoryColorElement = entryElement.querySelector("[data-entry-category-color]");
    const entryCategoryElement = entryElement.querySelector("[data-entry-category]");
    const entryDescriptionElement = entryElement.querySelector("[data-entry-description]");
    const entryAmountElement = entryElement.querySelector("[data-entry-amount]");

    const categoryMap = {
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

    const categoryData = categoryMap[entry.category] || categoryMap.other;

    setCategoryColorClass(entryCategoryColorElement,categoryData.color);
    entryCategoryElement.textContent = categoryData.label;
    entryDescriptionElement.textContent = entry.note;
    entryAmountElement.textContent = entry.amount;

    parent.appendChild(entryElement);
}

function setCategoryColorClass(element, newColorClass) {
    for (const cls of element.classList) {
      if (cls.startsWith("bg-")) {
        element.classList.remove(cls);
      }
    }
    element.classList.add(newColorClass);
  }