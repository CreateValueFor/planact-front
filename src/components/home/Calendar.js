import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Calendar.scss";
import koLocale from "@fullcalendar/core/locales/ko";
import { usePlans } from "../../modules/Plans/hook";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import useResponsive from "../../Responsive";
import useViews from "../../modules/View/hooks";
import styled from "styled-components";
import moment from "moment";
import CustomText, { CustomLabelText } from "../CustomText";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    style={{
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      textAlign: "start",
      fontSize: ".75rem",
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
      <div className="custom-render">
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

const StyledCalendarWrapper = styled.div`
  table > tbody > tr > th.fc-col-header-cell.fc-day div a {
    font-size: ${(props) => (props.isMobile ? "12px" : "1rem")};
  }
  tbody > tr > td.fc-daygrid-day.fc-day > div > div.fc-daygrid-day-top > a {
    font-size: ${(props) => (props.isMobile ? "12px" : "1rem")};
  }
  .fc-theme-standard td {
    border: ${(props) => (props.isMobile ? "1px solid transparent" : "auto")};
    border-bottom: 1px solid #e9e9e9;
  }
  table th .fc-scrollgrid-sync-inner {
    justify-content: ${(props) => (props.isMobile ? "center" : "flex-end")};
  }
  .fc .fc-daygrid-day-top {
    justify-content: ${(props) => (props.isMobile ? "center" : "auto")};
  }
`;

const StyledTitleFormat = styled.div`
  display: flex;
  flex-direction: column;
`;

function Calendar(style) {
  const { plans, getCalendarRenderer, exportPlans } = usePlans();
  console.log(plans);
  const calendar = useRef();
  const { isMobile } = useResponsive();
  const { changeView } = useViews();
  const height = window.innerHeight - 130;

  useEffect(() => {
    getCalendarRenderer();
    changeView("main");
  }, []);
  return (
    <StyledCalendarWrapper
      isMobile={isMobile}
      className={!isMobile && "mb-3"}
      style={isMobile ? { flex: 1 } : { flex: 1, marginRight: "3rem" }}
    >
      <FullCalendar
        height={isMobile ? `${height}px` : "100%"}
        plugins={[dayGridPlugin]}
        // initialView="dayGridMonth"
        ref={calendar}
        events={plans}
        eventContent={renderEventContent}
        locale={koLocale}
        dayHeaderFormat={(args) => {
          if (isMobile) {
            return moment(args.date).format("dd")[0];
          } else {
            return moment(args.date).format("ddd");
          }
        }}
        dayCellContent={(args) => {
          return moment(args.date).format("D");
        }}
        headerToolbar={{
          start: "",
          center: "prev,title,next",
          end: "share",
        }}
        titleFormat={(args) => {
          return (
            <StyledTitleFormat className="custom-title">
              <CustomText
                text={`${args.date.array[1] + 1}월`}
                fontSize={isMobile ? "16px" : "18px"}
              />
              <CustomLabelText
                text={args.date.array[0]}
                fontSize={isMobile ? "13px" : "14px"}
              />
            </StyledTitleFormat>
          );
        }}
        customButtons={{
          share: {
            text: "일정 다운로드",
            click: function() {
              exportPlans();
            },
          },
        }}
        eventColor="#ECFAE2"
        eventTextColor="#000"
        initialView="dayGridMonth"
        // locales={[koLocale]}
      />
    </StyledCalendarWrapper>
  );
}

export default Calendar;
