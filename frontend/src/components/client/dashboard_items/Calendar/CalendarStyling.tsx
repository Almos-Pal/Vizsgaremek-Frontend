import styled from "styled-components";

const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 100%;
    background: var(--color-grey-500);
    font-family: poppins;
    line-height: 1.125em;
    margin: 0%;
    border-radius: 10px;
    border: none;
    padding: 1rem;
  }
    abbr {
    text-decoration: none !important;
    }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar * ,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    background: var(--color-grey-400);
    color: var(--color-light);

  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
    align-items: center;
    justify-content: center;


  }

  .react-calendar__navigation button {
    min-width: 75px;
    background: none;
    color: var(--color-light);
    font-weight: bold;
    font-size: 1em;
    


  }

  .react-calendar__navigation button {
        min-width: 45px;
    background: none;
    color: var(--color-light);
    font-weight: bold;
    font-size: 1em;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
    color: var(--color-light);
    margin-bottom: 1rem;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend, .react-calendar__month-view__days__day, react-calendar__tile {
    margin: 10px;
    margin-top: 5px;
    padding-top: 7px !important;
    border: 0;
    outline: none;
    max-width: 30px !important;
    max-height: 30px !important;
    color: var(--color-light);
    border-radius: 25%;

        @media screen and (min-width: 600px) {
        margin: 11px;
      max-width: 34px !important;
      max-height: 34px !important;
      padding-top: 9px !important;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
    background: var(--color-grey-500) !important;
    pointer-events: none;
  }

  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
  
    padding: 2em 0.5em;
    border-radius: 8px;
    width: 50px;
    margin: 6px;
            @media screen and (min-width: 600px) {
       max-width: 75px !important;
       margin: 5px
    }
  }

  .react-calendar__tile {
    padding: 10px;
    background: none;
    margin: 7px !important;
    text-align: center;
    font: inherit;
    font-size: 0.833em;
    width: 100px;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled {
    color: #cdcdcd;
    width: 100px;
  }

  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: var(--color-primary-50);
    width: 100px;
  }

  .react-calendar__tile--now {
    background: var(--color-info) ;
    width: 100px;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background:var(--color-primary-50) ;
    width: 100px;
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
    width: 100px;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
    width: 100px;
  }

  .react-calendar__tile--active {
    background: var(--color-primary-50);
    color: white;
    width: 100px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: var(--color-primary-50);
    width: 100px;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
    width: 100px; 
  }
  .react-calendar__year-view__months{
  min-width: 2em; !important;
    width: 100%;}

    .highlighted {
    background: var(--color-primary-50) !important;}
  .grey-day {
  background: var(--color-primary-90) !important;
}

`;

export default CalendarContainer;
