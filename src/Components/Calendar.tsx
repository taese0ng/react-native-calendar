import React, {useEffect, useState} from 'react';
import {Paragraph} from './Paragraph';
import Color from '../assets/Color';
import {TouchableOpacity} from 'react-native';
import {
  ArrowLeftBlack,
  ArrowRightBlack,
} from '../assets/images/generatedSvg';
import styled from 'styled-components/native';

interface Props {
  isFunction?: Function;
  isKor?: String;
  inlineColor?: String;
  lastColor?: String;
  selectedList?: Array<Boolean>
}

const Calendar: React.FC<Props> = (props) => {
  const {isFunction, isKor, inlineColor, lastColor, selectedList} = props;
  const [date] = useState(new Date());
  const [today] = useState(date.getDate());
  const [currentMonth] = useState(date.getMonth());
  const [month, setMonth] = useState(date.getMonth());
  const [calendarDate, setCalendarDate] = useState<Array<any> | null>(null);
  const dayListEN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayListKR = ['월', '화', '수', '목', '금', '토', '일'];

  const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);
    setMonth(date.getMonth());
    settingMonth();
  };

  const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    setMonth(date.getMonth());
    settingMonth();
  };

  const settingMonth = () => {
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    let allDate = [];
    let rowDate = [];

    if (date.getDay() > 1) {
      for (let i = 1; i < date.getDay(); i++) {
        rowDate.push(0);
      }
    }

    for (let i = 1; i <= lastDate; i++) {
      rowDate.push(i);
      if (rowDate.length === 7) {
        allDate.push(rowDate);
        rowDate = [];
      }
    }
    if (rowDate.length > 0) {
      allDate.push(rowDate);
    }

    setCalendarDate(allDate);
  };

  useEffect(() => {
    date.setDate(1);
    settingMonth();
  }, []);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Paragraph fontSize={13} color={Color.gray01}>
          {date.getFullYear()}
        </Paragraph>
        <CalendarControl>
          <TouchableOpacity onPress={prevMonth}>
            <ArrowLeftBlack width={25} height={25} />
          </TouchableOpacity>

          <Paragraph
            fontSize={40}
            fontWeight={'bold'}
            style={{
              width: 150,
              textAlign: 'center',
              marginHorizontal: 9,
            }}>
            {month + 1 < 10 ? `0${month + 1}` : month + 1}
          </Paragraph>

          <TouchableOpacity onPress={nextMonth}>
            <ArrowRightBlack width={25} height={25} />
          </TouchableOpacity>
        </CalendarControl>
      </CalendarHeader>

      <CalendarBody>
        <CalendarDay>
          {(isKor ? dayListKR : dayListEN).map((day, idx) => {
            return (
              <CalendarDayItem key={idx} style={idx === 0 && {marginLeft: 0}}>
                <Paragraph
                  color={Color.gray01}
                  fontSize={14}
                  fontWeight={'bold'}>
                  {day}
                </Paragraph>
              </CalendarDayItem>
            );
          })}
        </CalendarDay>

        <CalendarDate>
          {calendarDate &&
            calendarDate.map((rowDate, idx) => {
              return (
                <CalendarRowDate key={idx}>
                  {rowDate.map((item: any, index: any) => {
                    const isTrue = selectedList[item - 1];
                    const isNextTrue = selectedList.length > item && selectedList[item];
                    const isFirst = index === 0 || !selectedList[item - 2];
                    const isToday =
                      today === item &&
                      currentMonth === month &&
                      date.getFullYear() === new Date().getFullYear();
                    return (
                      <CalendarDateItemWrapper
                        key={index}
                        isToday={isToday}
                        isTrue={isTrue}
                        isNextTrue={isNextTrue}
                        isFirst={isFirst}
                        isLast={index === rowDate.length - 1 || !isNextTrue}
                        inlineColor={inlineColor}
                        style={index === 0 && {marginLeft: 0}}>
                        {item === 0 || (
                          <React.Fragment>
                            <CalendarDateItem
                              isLast={isTrue && !isNextTrue}
                              isToday={isToday}
                              lastColor={lastColor}
                              onPress={isFunction}>
                              <Paragraph
                                key={index}
                                fontSize={14}
                                color={
                                  isTrue
                                    ? isNextTrue
                                      ? Color.black
                                      : Color.white
                                    : Color.black
                                }
                                fontWeight={'bold'}>
                                {item}
                              </Paragraph>
                            </CalendarDateItem>
                            {isToday && <CalendarTodayDot lastColor={lastColor}/>}
                          </React.Fragment>
                        )}
                      </CalendarDateItemWrapper>
                    );
                  })}
                </CalendarRowDate>
              );
            })}
        </CalendarDate>
      </CalendarBody>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.View`
  align-items: center;
  background-color: ${Color.white};
  height: 550px;
`;

const CalendarHeader = styled.View`
  width: 100%;
  align-items: center;
`;

const CalendarControl = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  height: 40px;
  margin-top: 10px;
`;

const CalendarBody = styled.View`
  width: 100%;
  margin: 52px;
`;

const CalendarDay = styled.View`
  flex-direction: row;
  width: 100%;
`;

const CalendarDayItem = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin: 0 4px 4px 4px;
`;

const CalendarDate = styled.View`
  width: 100%;
`;

const CalendarRowDate = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 8px 0;
`;

const CalendarDateItemWrapper = styled.View<{
  isTrue?: Boolean;
  isNextTrue?: Boolean;
  isFirst?: Boolean;
  isLast?: Boolean;
  isToday?: Boolean;
  inlineColor?: string;
}>`
  align-items: center;
  justify-content: center;
  width: 47px;
  height: 47px;

  background: ${(props) => (props.isTrue ? (props.inlineColor || Color.gray02) : Color.white)};
  border-radius: ${(props) => (props.isTrue ? '100px' : '0px')};
  border-radius: ${(props) => (props.isNextTrue ? '0px' : '100px')};
  border-top-left-radius: ${(props) =>
    props.isFirst || (props.isToday && !props.isTrue) ? '100px ' : '0px'};
  border-bottom-left-radius: ${(props) =>
    props.isFirst || (props.isToday && !props.isTrue) ? '100px ' : '0px'};
  border-top-right-radius: ${(props) => (props.isLast ? '100px' : '0px')};
  border-bottom-right-radius: ${(props) => (props.isLast ? '100px' : '0px')};
`;

const CalendarDateItem = styled.TouchableOpacity<{
  isLast?: Boolean;
  isToday?: Boolean;
  lastColor?: string;
}>`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: ${(props) => (props.isLast ? (props.lastColor || Color.pink) : 'transparent')};

  border: ${(props) =>
    props.isToday ? `solid 3px ${(props.lastColor || Color.pink)}` : 'solid 0px white'};
`;

const CalendarTodayDot = styled.View<{
  lastColor?: string;
}>`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100px;
  background: ${props => props.lastColor || Color.pink};
  bottom: -10px;
`;

export default Calendar;
