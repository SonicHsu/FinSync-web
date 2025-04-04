import { isTheSameDay, today } from "./date.js";
import { initEventList } from "./event-list.js";

const calendarTemplateElement = document.querySelector("[data-template='day-calendar']");
const calendarDayOfWeekTemplateElement = document.querySelector("[data-template='day-calendar-day-of-week']");
const calendarColumnTemplateElement = document.querySelector("[data-template='day-calendar-column']");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: 'short'
});

export function initDayCalendar(parent, selectedDate, eventStore, deviceType) {
    const calendarContent = calendarTemplateElement.content.cloneNode(true);
    const calendarElement = calendarContent.querySelector("[data-day-calendar]");
    const calendarDayOfWeekListElement = calendarElement.querySelector("[data-day-calendar-day-of-week-list]");
    const calendarColumnsElement = calendarElement.querySelector("[data-day-calendar-columns]");
    
    const weekDay = selectedDate;
    const events = eventStore.getEventsByDate(weekDay);
    
    initDayOfWeek(calendarDayOfWeekListElement, weekDay, deviceType);
    initColumns(calendarColumnsElement, events);
    
    parent.appendChild(calendarElement);
}

function initDayOfWeek(parent, weekDay, deviceType) {
    const calendarDayOfWeekContent = calendarDayOfWeekTemplateElement.content.cloneNode(true);
    const calendarDayOfWeekElement = calendarDayOfWeekContent.querySelector("[data-day-calendar-day-of-week]");
    const calendarDayOfWeekButtonElement = calendarDayOfWeekElement.querySelector("[data-day-calendar-day-of-week-button]");
    const calendarDayOfWeekDayElement = calendarDayOfWeekElement.querySelector("[data-day-calendar-day-of-week-day]");
    const calendarDayOfWeekNumberElement = calendarDayOfWeekElement.querySelector("[data-day-calendar-day-of-week-number]");

    calendarDayOfWeekNumberElement.textContent = weekDay.getDate();
    calendarDayOfWeekDayElement.textContent = dateFormatter.format(weekDay);

    if (isTheSameDay(weekDay, today())) {
        calendarDayOfWeekButtonElement.classList.add("day-calendar__day-of-week-button--highlight");
    }

    parent.appendChild(calendarDayOfWeekElement);
}

function initColumns(parent, events) {
    const calendarColumnContent = calendarColumnTemplateElement.content.cloneNode(true);
    const calendarColumnElement = calendarColumnContent.querySelector("[data-day-calendar-column]");

    initEventList(calendarColumnElement, events);

    parent.appendChild(calendarColumnElement);
}