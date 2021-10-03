import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.scss";
import koLocale from "@fullcalendar/core/locales/ko";
import { usePlans } from "../../modules/Plans/hook";

function Calendar() {
  const { plans } = usePlans();
  const calendar = useRef();
  // console.log(calendar.current.getApi());
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      // initialView="dayGridMonth"
      ref={calendar}
      events={plans}
      dayHeaderFormat={{
        weekday: "short",
      }}
      headerToolbar={{
        start: "myCustomButton",
        center: "prev,title,next",
        end: "",
      }}
      titleFormat={{ year: "numeric", month: "long" }}
      buttonText={{
        calendar: "달력",
      }}
      customButtons={{
        myCustomButton: {
          text: "달력",
          // click: function() {
          //   alert("clicked the custom button!");
          // },
        },
      }}
      eventColor="#ECFAE2"
      eventTextColor="#000"
      eventSources={plans}
      initialView="dayGridMonth"
      // locales={[koLocale]}
    />
  );
}

export default Calendar;
