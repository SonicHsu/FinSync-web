export function validAmount(entryAmountInput) {
    const amountStr = entryAmountInput.value.trim();
    const parsedAmount = parseInt(amountStr, 10);
    if(amountStr === "" || isNaN(parsedAmount)) {
        throw new Error("請輸入有效金額");
    }
    return parsedAmount;
}

export function parseDate(entryDate) {
    const dateStr = entryDate.textContent.trim();
    const date = new Date(dateStr.replace(/-/g, "/"));
    if(isNaN(date.getTime())) {
        throw new Error("請選擇有效日期");
    }
    return date;
}

export function validNote(entryNoteInput) {
    const noteStr = entryNoteInput.value.trim();
    if(noteStr.length > 25) {
        throw new Error("內容過長");
    }
    return noteStr;
}
