import {css} from 'lit-element';

export const styles = css`
:host {
    font-family: "Helvetica Neue Bold", arial, helvetica, sans-serif;
    font-size: 1em;
    display: block;
    position: relative;
    width: 8em;
    height: 7.5em;
    box-shadow: 0 1px 0 #bdbdbd, 0 2px 0 #fff, 0 3px 0 #bdbdbd, 0 4px 0 #fff, 0 5px 0 #bdbdbd, 0 0 0 1px #bdbdbd;
    -webkit-backface-visibility: hidden;
    -webkit-transform: rotate(0deg) skewY(0deg);
    -webkit-transform-origin: 50% 10%;
    transform-origin: 50% 10%;
}

  div.icon * {
    display: block;
    width: 100%;
    font-size: 1em;
    font-weight: bold;
    font-style: normal;
    text-align: center;
  }
  div.icon .month {
    transform: translateY(-3px);
    padding: 0.4em 0;
    border-top-right-radius: 0.6em;
    border-top-left-radius: 0.6em;
    color: #fff;
    background-color: #fd9f1b;
    border-bottom: 1px dashed #f37302;
    box-shadow: 0 2px 0 #fd9f1b;
  }
  div.icon .month-title {
    margin: 0 auto;
    width: 80px;
  }
  div.icon .month .prev, div.icon .month .next {
    cursor: pointer;
    height: 17px;
    overflow: hidden;
    position: absolute;
    width: 10px;
    top: 4px;
  }
  div.icon .month .prev.disabled, div.icon .month .next.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  div.icon .month .prev:before, div.icon .month .next:before {
    background-color: #fff;
    content: "";
    height: 17px;
    left: 5px;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
    width: 17px;
  }
  div.icon .month .prev:after, div.icon .month .next:after {
    background-color: #fd9f1b;
    content: "";
    height: 17px;
    left: 8px;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
    width: 17px;
  }
  div.icon .month .next {
    right: 6px;
    top: 8px;
  }
  div.icon .month .next:before {
    left: auto;
    right: 5px;
  }
  div.icon .month .next:after {
    left: auto;
    right: 8px;
  }
  div.icon .month .prev {
    left: 6px;
    top: 8px;
  }

  div.icon .month .prev[disabled='true'] {
    opacity:0.5;
    pointer-events: none;
  }
  div.icon em {
    position: absolute;
    bottom: 0.3em;
    color: #fd9f1b;
  }
  div.icon .year {
    width: 100%;
    font-size: 2.3em;
    letter-spacing: -0.05em;
    top: 30px;
    position: absolute;
    color: #2f2f2f;
    background-color: #fff;
    height: 90px;
 
  }
  div.icon.primary .month {
    background-color: #033c73;
    border-bottom: 1px dashed #033c73;
    box-shadow: 0 2px 0 #033c73;
  }
  div.icon.primary .prev:after, div.icon.primary .next:after {
    background-color: #033c73 !important;
  }
  @-webkit-keyframes swing {
    0% {
      -webkit-transform: rotate(0deg) skewY(0deg);
    }
    20% {
      -webkit-transform: rotate(12deg) skewY(4deg);
    }
    60% {
      -webkit-transform: rotate(-9deg) skewY(-3deg);
    }
    80% {
      -webkit-transform: rotate(6deg) skewY(-2deg);
    }
    100% {
      -webkit-transform: rotate(0deg) skewY(0deg);
    }
  }
  @keyframes swing {
    0% {
      transform: rotate(0deg) skewY(0deg);
    }
    20% {
      transform: rotate(12deg) skewY(4deg);
    }
    60% {
      transform: rotate(-9deg) skewY(-3deg);
    }
    80% {
      transform: rotate(6deg) skewY(-2deg);
    }
    100% {
      transform: rotate(0deg) skewY(0deg);
    }
  }
  .md-select {
    position: absolute;
    top: 28%;
    left: 50%;
    transform: translate(-50%);
    display: block;
    margin: 10px 0 8px 0;
    padding-bottom: 2px;
    min-width: 100px;
    background-color: #fff;
  }
  .md-select *, .md-select :after, .md-select :before {
    box-sizing: border-box;
    /*Demo css do not add to your project*/
  }
  .md-select label {
    font-size: 28px;
  }
  .md-select [type=button] {
    background: #fff;
    border: none;
    color: rgba(0, 0, 0, 0.73);
    cursor: pointer;
    display: block;
    line-height: 20px;
    padding: 2px 0 10px 20px;
    position: relative;
    text-align: center;
    text-shadow: none;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    text-align: left;
  }
  .md-select [type=button]:after {
    width: 0px;
    height: 0px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid rgba(0, 0, 0, 0.73);
    content: " ";
    margin-left: 10px;
    margin-top: 6px;
    position: absolute;
  }
  .md-select ul[role=listbox] {
    background-color: white;
    cursor: default;
    list-style: none;
    line-height: 26px;
    overflow: hidden;
    margin: 0;
    max-height: 0;
    position: absolute;
    padding: 0;
    transform: translateY(-50%);
    transition: all 0.15s cubic-bezier(0.35, 0, 0.25, 1);
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
    scrollbar-color: #DDDDDD #FFFFFF;
    scrollbar-width: 8px;
  }
  .md-select ul[role=listbox] li {
    height: 38px;
    margin: 0;
    padding: 7px 16px;
    outline: none;
    overflow: hidden;
    font-weight: 600;
    font-size: 18px;
    font-family: Arial;
    cursor: pointer;
    font-family: "Helvetica Neue Bold", arial, helvetica, sans-serif;
  }
  .md-select ul[role=listbox] li:focus, .md-select ul[role=listbox] li:hover, .md-select ul[role=listbox] li.active {
    background: rgba(0, 0, 0, 0.1);
  }
  .md-select ul[role=listbox]::-webkit-scrollbar {
    width: 8px;
  }
  .md-select ul[role=listbox]::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }
  .md-select ul[role=listbox]::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .md-select.active ul {
    max-height: 200px;
    overflow: auto;
    padding: 8px 0 16px 0px;
    z-index: 2;
    transition: all 0.2s ease;
  }
  `;
