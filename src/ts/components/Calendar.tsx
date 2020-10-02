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
  background: rgba(70, 70, 70, 1);
  color: rgba(170, 170, 170, 1);
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
  background: rgba(70, 70, 70, 1);
  box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.4);

  .pika-single {
    background: transparent;
    border: none;
  }

  .pika-label {
    background-color: transparent;
    color: rgba(170, 170, 170, 1);
  }

  .pika-lendar {
    float: none;
    width: 100%;
    margin: 0;
  }

  .pika-lendar abbr {
    text-decoration: none;
  }

  .pika-button {
    background: transparent;
    text-align: center;
  }

  .is-today .pika-button,
  .pika-button:hover {
    color: rgba(170, 170, 170, 1);
  }

  .is-selected .pika-button {
    background: rgba(170, 170, 170, 0.25);
    box-shadow: none;
    color: rgba(170, 170, 170, 1);
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
    color: rgba(170, 170, 170, 1);
  }

  .pika-next::before {
    content: "▶";
    color: rgba(170, 170, 170, 1);
  }
`;

let pikaday: Pikaday;

const Calendar = (props: Props) => {
  const [value, setValue] = useState(dateToISO(props.value || new Date()));
  const [open, setOpen] = useState(false);

  const container = useRef<HTMLInputElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const dropDown = useRef<HTMLDivElement>(null);

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
      dropDown.current.appendChild(pikaday.el);
      document.body.addEventListener("click", isClickOutside);
    } else {
      pikaday?.destroy();
      pikaday = null;
    }

    return () => document.body.removeEventListener("click", isClickOutside);
  }, [open]);

  return (
    <Container className={props.className} ref={container}>
      <Input value={value} ref={input} onClick={() => setOpen(true)} />
      {open && <DropDown ref={dropDown} />}
    </Container>
  );
};

export default Calendar;
