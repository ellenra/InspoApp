import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }

    .layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16;
    }
`

export const PictureContainer = styled.div`
  margin-bottom: 10px;
`

export const PictureImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`
