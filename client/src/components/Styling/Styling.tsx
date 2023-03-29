import React from 'react';
import {createCache,CacheProvider,createTheme,CssBaseline,ThemeProvider,TssCacheProvider} from "@styling"

export type ChildrenProps = {
    children: React.ReactNode
}
export const muicache = createCache({
    key: 'mui',
    prepend: true
});

export const tsscache = createCache({
    key: 'tss'
})

const theme = createTheme({
    palette: {
        primary: {
            main: "#3A4EFF",
            dark: "#170F49",
        }
    }
})

export const Styling : React.FC<ChildrenProps> = ({children}) => {
  return (
      <CacheProvider value={muicache}>
          <TssCacheProvider value={tsscache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        {children}
                    </CssBaseline>
                </ThemeProvider>
          </TssCacheProvider>
    </CacheProvider>
  )
}
