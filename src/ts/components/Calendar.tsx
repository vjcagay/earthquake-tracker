import Pikaday from "pikaday";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dateToISO from "../utils/dateToISO";

interface Props {
  className?: string;
  value?: Date;
  onChange?: (value: Date) => void;
}

const Container = styled.div`
  position: relative;
`;

const Input = styled.input.attrs(() => ({ type: "text", readOnly: true }))`
  border: none;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  background: var(--background-secondary);
  color: var(--color-secondary);
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  text-align: center;
`;

const DropDown = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 8px 12px 12px;
  border-radius: 12px;
  background: var(--background-secondary);
  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.4);

  .pika-single {
    background: transparent;
    border: none;
  }

  .pika-label {
    background-color: transparent;
    color: var(--color-secondary);
  }

  .pika-lendar {
    float: none;
    width: 100%;
    margin: 0;
  }

  .pika-lendar abbr {
    text-decoration: none;
  }

  .pika-table td {
    text-align: center;
  }

  .pika-button {
    background: transparent;
    text-align: center;
    display: initial;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .is-today .pika-button,
  .pika-button:hover {
    color: var(--color-secondary);
  }

  .is-selected .pika-button {
    background: var(--background-selected);
    box-shadow: none;
    color: var(--color-secondary);
  }

  .is-selected:not(.is-today) .pika-button {
    font-weight: normal;
  }

  .pika-prev,
  .pika-next {
    background-image: none;
    color: transparent;
    text-indent: 4px;
  }

  .pika-prev::before {
    content: "◀";
    color: var(--color-secondary);
  }

  .pika-next::before {
    content: "▶";
    color: var(--color-secondary);
  }
`;

const Controls = styled.div`
  margin-top: 8px;
  text-align: center;

  button {
    border: none;
    outline: none;
    background: transparent;
    color: var(--color-secondary);
    cursor: pointer;
  }
`;

let pikaday: Pikaday;

const Calendar = (props: Props) => {
  const [value, setValue] = useState(dateToISO(props.value || new Date()));
  const [open, setOpen] = useState(false);

  const container = useRef<HTMLInputElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const calendarMount = useRef<HTMLDivElement>(null);

  const isClickOutside = (event: MouseEvent) => {
    if (!container.current.contains(event.target as HTMLElement)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      pikaday = new Pikaday({
        setDefaultDate: true,
        defaultDate: new Date(value),
        onSelect(value) {
          setValue(dateToISO(value));
          setOpen(false);
          props.onChange?.(value);
        },
      });
      calendarMount.current.appendChild(pikaday.el);
      document.body.addEventListener("click", isClickOutside);
    } else {
      pikaday?.destroy();
      pikaday = null;
    }

    return () => document.body.removeEventListener("click", isClickOutside);
  }, [open]);

  const goToToday = () => {
    pikaday?.gotoToday();
  };

  return (
    <Container className={props.className} ref={container}>
      <Input value={value} ref={input} onClick={() => setOpen(true)} />
      {open && (
        <DropDown>
          <div ref={calendarMount} />
          <Controls>
            <button onClick={goToToday}>Go to Today</button>
          </Controls>
        </DropDown>
      )}
    </Container>
  );
};

export default Calendar;
