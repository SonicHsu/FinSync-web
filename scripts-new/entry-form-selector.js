import { initEntryOptionSelector } from "./entry-utils.js";



export function initEntryFormSelectors(entryFormElement, mode = "create") {
  // 類型選擇器（支出 / 收入）
  const typeSelector = initEntryOptionSelector(
    entryFormElement,
    "[data-entry-type-button]",
    "entryTypeButton",
    "button-option",
    "button-option-selected",
    "entryTypeChange",
    mode === "edit"
  );

  // 模式選擇器
  const modeSelector = initEntryOptionSelector(
    entryFormElement,
    "[data-entry-mode]",
    "entryMode",
    "category-button",
    "category-button-selected",
    "entryModeChange"
  );

  const expenseCategoryList = entryFormElement.querySelector("[data-entry-category-list-expense]");
  const incomeCategoryList = entryFormElement.querySelector("[data-entry-category-list-income]");

  // 類別列表（根據類型切換顯示）
  const categoryListsByType = {
    expense: expenseCategoryList,
    income: incomeCategoryList,
  };


  // 類別選擇器（支出分類）
  const expenseSelector = initEntryOptionSelector(
    expenseCategoryList,
    "[data-entry-category]",
    "entryCategory",
    "category-button",
    "category-button-selected",
    "entryCategoryChange"
  );

  // 類別選擇器（收入分類）
  const incomeSelector = initEntryOptionSelector(
    incomeCategoryList,
    "[data-entry-category]",
    "entryCategory",
    "category-button",
    "category-button-selected",
    "entryCategoryChange"
  );

  return {
    typeSelector,
    modeSelector,
    expenseSelector,
    incomeSelector,
    categoryListsByType,
  };
}


