import memo from "react";
import {
  useLocalStorage,
  useColorScheme,
  useResizeObserver
} from "@mantine/hooks";
import {
  MantineProvider,
  AppShell,
  Header,
  useMantineTheme,
  createStyles,
  useMantineColorScheme,
  Center,
  Box,
  Container,
  em
} from "@mantine/core";
import React from "react";

const Page = () => {
  const [ref, rect] = useResizeObserver<HTMLDivElement>();
  const useStyles = createStyles((theme) => ({
    wrapper: {
      // subscribe to color scheme changes right in your styles
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      maxWidth: "unset",
      width: "100%",
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      boxSizing: "content-box",
      alignItems: "center"
    },
    leftBox: {
      backgroundImage: `linear-gradient(20deg, transparent, 'blue', 'red', 'orange', 'cyan', 'white'))`,
      position: "relative",
      minWidth: "100%"
    },
    rightBox: {
      backgroundImage: `linear-gradient(20deg, transparent, 'blue', 'red', 'orange', 'cyan', 'white'))`,
      position: "relative",
      minWidth: "100%"
    }
  }));

  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} ref={ref}>
      <AppShell
        navbar={undefined}
        aside={undefined}
        footer={undefined}
        header={
          <Header
            height={
              rect.width < 601 ? em(rect.height / 16) : em(rect.height / 16)
            }
          >
            {/* upd: fix bump mantine version to 6 local and this codebox are equals
             */}
            {Header.displayName}
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            maxWidth: "auto",
            width: rect.width < 601 ? em(rect.width / 2) : em(rect.width / 2),
            display: "flex",
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "content-box",
            alignItems: "center"
          }
        })}
      >
        <Box>
          <Center>{Box.displayName}</Center>
        </Box>
      </AppShell>
    </Container>
  );
};

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<"dark" | "light">({
    key: "color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true
  });
  const toggleColorScheme = () =>
    setColorScheme((current: string) =>
      current === "dark" ? "light" : "dark"
    );
  return (
    <MantineProvider
      withNormalizeCSS
      theme={{
        white: "#F2F2F3",
        fontFamily: "JetBrains Mono, sans-serif",
        colorScheme,
        breakpoints: {
          xs: "36em",
          sm: "48em",
          md: "62em",
          lg: "75em",
          xl: "88em"
        },
        colors: {
          brand: [
            "#0D0D0F",
            "#131316",
            "#131316", // фон
            "#1C1C21", // header backgr
            "#2F2F37", // back for scrollbar
            "#8482AB", // non-active text, active scrollbar          dark: normal
            "#7510B4", // button GRADIENT START light: normal
            "#5238F3", // BUTTON GRADIENT end LIGHT: ON hover      <Badge variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Teal blue</Badge>
            "#F2F2F3", // active text     dark: ON HOVER
            "#F2F2F3" //dark: ON HOVER
          ]
        },
        primaryColor: "brand"
      }}
    >
      <Page />
    </MantineProvider>
  );
}
