import React from "react";
import styled from "styled-components";
import dateToISO from "../utils/dateToISO";
import Calendar from "./Calendar";

interface Props {
  className?: string;
  features?: Feature[];
  loading?: boolean;
  onDateChange?: (date: Date) => void;
}

const Container = styled.div`
  background: rgba(50, 50, 50, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.4);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  flex-grow: 1;
  overflow: scroll;
  border: 1px solid rgba(127, 127, 127, 1);
  border-left: none;
  border-right: none;
  margin: 16px -16px;

  li {
    display: flex;
    align-items: center;
    padding: 8px 16px 8px 0;
    margin-left: 16px;

    div {
      flex-grow: 1;
      min-width: 0;
    }

    strong,
    p {
      color: #ffffff;
    }

    strong {
      display: inline-block;
      width: 60px;
      text-align: center;
      flex-shrink: 0;
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    small {
      color: rgba(170, 170, 170, 1);
    }
  }

  li:not(last-child) {
    border-bottom: 1px solid rgba(80, 80, 80, 1);
  }
`;

const Notice = styled.small`
  display: block;
  color: rgba(170, 170, 170, 1);
  text-align: center;
`;

const Dialog = (props: Props) => {
  return (
    <Container className={props.className}>
      <Calendar onChange={(date) => props.onDateChange?.(date)} />
      <List>
        {props.features.length > 0 &&
          !props.loading &&
          props.features.map(({ id, properties }) => (
            <li key={id}>
              <strong>{Math.round(properties.mag * 10) / 10}</strong>
              <div>
                <p>{properties.place}</p>
                <small>{dateToISO(new Date(properties.time))}</small>
              </div>
            </li>
          ))}
        {!props.features.length && !props.loading && (
          <li>
            <small>Selected date has no records yet.</small>
          </li>
        )}
        {props.loading && (
          <li>
            <small>Loading data...</small>
          </li>
        )}
      </List>
      <Notice>Only earthquakes over magnitude 3 are shown.</Notice>
    </Container>
  );
};

export default Dialog;
