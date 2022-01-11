import { useMemo } from 'react';
import styled from 'styled-components';

import { DAYS } from '../../../constant';
import { MeOutput } from '../../../graphQL/types';

const StyledCalendar = styled.div`
  width: 100%;
  height: 8%;
  min-height: 75px;

  display: flex;
  flex-direction: row;

  border: 0.5px solid ${({ theme }) => theme.colors.grey3};
  border-left: 0px;
  border-right: 0px;

  cursor: pointer;
`;

const StyledCalendarItem = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  font-family: Spoqa Han Sans Neo;

  font-size: 16px;
  color: ${({ theme, isToday }) =>
    isToday ? theme.colors.purple1 : theme.colors.grey1};
`;

type PropTypes = {
  dataMe?: MeOutput;
  today: Date;
  setToday: React.Dispatch<React.SetStateAction<Date>>;
};

export const DiaryCalendar = ({
  dataMe,
  today = new Date(),
  setToday = () => {},
}: PropTypes) => {
  const dates = useMemo(() => {
    let startOfWeekDate: Date;

    const nowDay = today.getDay();

    if (nowDay === 0) {
      startOfWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 6,
      );
    } else {
      startOfWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - nowDay + 1,
      );
    }

    return [...new Array(7).keys()].map(
      (num) =>
        new Date(
          startOfWeekDate.getFullYear(),
          startOfWeekDate.getMonth(),
          startOfWeekDate.getDate() + num,
        ),
    );
  }, [today]);

  return (
    <StyledCalendar>
      {dates.map((date) => (
        <StyledCalendarItem
          isToday={date.toDateString() === today.toDateString()}
          key={date.getTime()}
          onClick={() => {
            setToday(date);
          }}
        >
          <span>{DAYS[date.getDay()]}</span>
          <span>{date.getDate()}</span>
        </StyledCalendarItem>
      ))}
    </StyledCalendar>
  );
};
