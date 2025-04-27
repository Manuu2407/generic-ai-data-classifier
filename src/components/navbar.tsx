import React from "react";
import { createTheme, ThemeProvider, Nav } from "@fluentui/react";
// import { Nav } from "@fluentui/react-nav-preview";
import { DataBarVerticalAddRegular } from '@fluentui/react-icons';
import { Text } from "@fluentui/react-components";
import "../App.css";

const appTheme = createTheme({
  palette: {
    themePrimary: "#0078d4",
    themeLighterAlt: "#eff6fc",
    themeLighter: "#deecf9",
    themeLight: "#c7e0f4",
    themeTertiary: "#71afe5",
    themeSecondary: "#2b88d8",
    themeDarkAlt: "#106ebe",
    themeDark: "#005a9e",
    themeDarker: "#004578",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

const pages = [
  { url: "/generator", name: "Data Generator", icon: "Data", key: "data_generator" },
  { url: "/bulk-generator", name: "Bulk Data Generator", icon: "Bulk", key: "bulk_generator" },
];

const Navigation = () => {
  const [currentPage, setCurrentPage] = React.useState(pages[0].name);

  const handleNavClick = (ev: any, item: any) => {
    if (item) {
      setCurrentPage(item.url);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: appTheme.palette.themePrimary,
            color: appTheme.palette.white,
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <Text size={600} weight="semibold">{currentPage}</Text>
        </header>

        {/* Main Layout */}
        <div style={{ display: "flex", flexGrow: 1 }}>
          {/* Vertical Navbar */}
          <nav
            style={{
              width: "200px",
              borderRight: `1px solid ${appTheme.palette.neutralQuaternary}`,
              backgroundColor: appTheme.palette.neutralLighterAlt,
              padding: "1rem 0",
            }}
          >
            <Nav
              groups={[{
                links: pages.map((page) => ({
                  url: page.url,
                  name: page.name,
                  key: page.key,
                })),
              }]}
              selectedKey={currentPage.toLowerCase()}
              onLinkClick={handleNavClick}
            />
          </nav>

          {/* Content */}
          <main style={{ flexGrow: 1, padding: "1rem" }}>
            <Text size={400}>This is the {currentPage} page content.</Text>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Navigation;
