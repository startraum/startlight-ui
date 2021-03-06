import * as React from 'react'
import Slider from 'react-input-range'
import styled from 'styled-components'
import ease from '../utils/ease'

export default styled(({ className, ...props }) => (
  <div className={className}>
    <Slider
      {...props }
      value={ease(props.value, true)}
      onChange={(val: number) => {
        const eased = ease(val)
        const outVal = 255 / 100 * eased < 2 && eased > 0 ? 100 / 255 * 2 : eased
        props.onChange(outVal)
      }}
    />
  </div>
))`
  padding: 35px 15px 0;
  margin-bottom: 20px;

  .input-range__slider {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    appearance: none;
    box-sizing: border-box;
    background: rgba(225, 225, 225, 1);
    border: 1px solid rgba(225, 225, 225, 1);
    border-radius: 100%;
    cursor: pointer;
    display: block;
    margin-left: -15px;
    margin-top: -20px;
    outline: none;
    position: absolute;
    top: 50%;
    height: 30px;
    width: 30px;
    box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
    transition: transform .2s;
  }

  .input-range__slider:active {
    transform: scale(1.1);
  }

  .input-range__slider:focus {
    box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2);
  }

  .input-range--disabled .input-range__slider {
    background: rgba(175, 175, 175, 1);
    border: 1px solid rgba(175, 175, 175, 1);
    pointer-events: none;
  }

  .input-range__label {
    color: rgba(254, 254, 254, 0.42);
    font-family: "Helvetica Neue", san-serif;
    font-size: 0.8rem;
    transform: translateZ(0);
    white-space: nowrap;
  }

  .input-range__label--min,
  .input-range__label--max {
    display: none;
  }

  .input-range__label--min {
    left: 0;
  }

  .input-range__label--max {
    right: 0;
  }

  .input-range__label--value {
    position: absolute;
    top: -40px;
  }

  .input-range__label-container {
    left: -40%;
    position: relative;
  }

  .input-range__label--max .input-range__label-container {
    left: 50%;
  }

  .input-range__track {
    background: rgba(228, 228, 228, .1);
    box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
    border-radius: 0.3rem;
    cursor: pointer;
    display: block;
    height: 10px;
    position: relative;
  }

  .input-range--disabled .input-range__track--active {
    background: rgba(175, 175, 175, 1);
  }

  .input-range__track--background {
    left: 0;
    margin-top: -5px;
    position: absolute;
    right: 0;
    top: 50%;
  }

  .input-range__track--active {
    background: rgba(225, 225, 225, 1);
    margin-left: -15px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-range {
    height: 30px;
    position: relative;
    width: 100%;
  }
`
