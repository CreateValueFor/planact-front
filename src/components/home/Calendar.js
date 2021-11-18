import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.scss";
import koLocale from "@fullcalendar/core/locales/ko";
import { usePlans } from "../../modules/Plans/hook";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import useResponsive from "../../Responsive";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    style={{
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timetext}</b> */}
      <div className="mb-2 custom-render">
        <Dropdown drop="end">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {eventInfo.event.title}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Card>
              <Card.Body>{eventInfo.event.title}</Card.Body>
            </Card>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

function Calendar(style) {
  const { plans, getCalendarRenderer } = usePlans();
  const calendar = useRef();
  const { isMobile } = useResponsive();
  useEffect(() => {
    getCalendarRenderer();
  }, []);

  return (
    <div
      className={!isMobile && "mb-3"}
      style={isMobile ? { flex: 1 } : { flex: 1, marginRight: "3rem" }}
    >
      <FullCalendar
        height={isMobile ? "600px" : "100%"}
        plugins={[dayGridPlugin]}
        // initialView="dayGridMonth"
        ref={calendar}
        events={plans}
        eventContent={renderEventContent}
        dayHeaderFormat={{
          weekday: "short",
        }}
        headerToolbar={{
          start: "",
          center: "prev,title,next",
          end: "share",
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        customButtons={{
          share: {
            text: "일정 다운로드",
            click: function() {
              alert("clicked the custom button!");
            },
          },
        }}
        eventColor="#ECFAE2"
        eventTextColor="#000"
        initialView="dayGridMonth"
        // locales={[koLocale]}
      />
    </div>
  );
}

export default Calendar;
