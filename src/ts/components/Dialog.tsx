import React, { useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import dateToISO from "../utils/dateToISO";
import Calendar from "./Calendar";

interface Props {
  className?: string;
  features?: Feature[];
  loading?: boolean;
  onDateChange?: (date: Date) => void;
  selectedFeature?: {
    id: string;
    centerMap: boolean;
  };
  onFeatureSelect?: (feature: { id: string; centerMap: boolean }) => void;
}

const Container = styled.div`
  background: var(--background-primary);
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
  border: 1px solid var(--border-primary);
  border-left: none;
  border-right: none;
  margin: 16px -16px;
`;

const ListItem = styled.li<{ selected?: boolean }>`
  background: ${(props) => (props.selected ? "var(--background-secondary)" : "transparent")};
  display: flex;
  align-items: center;
  cursor: pointer;

  div {
    flex-grow: 1;
    min-width: 0;
    padding: 8px 16px 8px 0;
  }

  strong,
  p {
    color: var(--color-primary);
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
    color: var(--color-secondary);
  }

  &:not(last-child) div {
    border-bottom: 1px solid var(--border-secondary);
  }
`;

const EmptyListItem = styled.li`
  border-bottom: 1px solid var(--border-secondary);
  padding: 8px 16px;
  color: var(--color-secondary);
`;

const Notice = styled.small`
  display: block;
  color: var(--color-secondary);
  text-align: center;
`;

const Dialog = (props: Props) => {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (props.selectedFeature?.id) {
      list.current.querySelector(`[data-id="${props.selectedFeature?.id}"]`).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [props.selectedFeature]);

  return (
    <Container className={props.className}>
      <Calendar onChange={(date) => props.onDateChange?.(date)} />
      <List ref={list}>
        {props.features.length > 0 &&
          !props.loading &&
          props.features.map(({ id, properties }) => (
            <ListItem
              key={id}
              data-id={id}
              onClick={() =>
                props.onFeatureSelect?.({
                  id,
                  centerMap: true,
                })
              }
              selected={props.selectedFeature?.id === id}
            >
              <strong>{Math.round(properties.mag * 10) / 10}</strong>
              <div>
                <p title={properties.place}>{properties.place}</p>
                <small>
                  {dateToISO(new Date(properties.time))} {new Date(properties.time).toTimeString().split(" ")[0]}
                </small>
              </div>
            </ListItem>
          ))}
        {!props.features.length && !props.loading && (
          <EmptyListItem>
            <div>
              <small>Selected date has no records yet.</small>
            </div>
          </EmptyListItem>
        )}
        {props.loading && (
          <EmptyListItem>
            <div>
              <small>Loading data...</small>
            </div>
          </EmptyListItem>
        )}
      </List>
      <Notice>Only earthquakes over magnitude 3 are shown.</Notice>
    </Container>
  );
};

export default Dialog;
