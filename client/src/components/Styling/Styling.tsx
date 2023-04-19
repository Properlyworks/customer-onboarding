import React from 'react';
import {createCache,CacheProvider,createTheme,CssBaseline,ThemeProvider,TssCacheProvider} from "@styling"
import { ChildrenProps } from '@types';

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
        },
        secondary: {
            main: "#F3F1FF"
        },
        text: {
            primary: "#170F49",
            secondary: "#6F6C90"
        }
        
    },
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 320,
            md: 540,
            lg: 768,
            xl: 900
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
