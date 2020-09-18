import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #wrapper {
    max-width: 1345px;
    min-width: 360px;
    margin: 0 auto;
    overflow: hidden;
    padding: 16px;
  }

  .main {
    border-radius: 4px;
    padding: 16px;
    min-height: 500px;
    margin: 10px 0 30px 0;
  }

  button {
    cursor: pointer;
  }
`
