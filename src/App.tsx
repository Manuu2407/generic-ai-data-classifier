import React from 'react';
import { ThemeProvider, Nav, createTheme } from '@fluentui/react';
import { Text } from "@fluentui/react-components";
import './App.css';
import { DataGenForm } from './components/DataGenForm';

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
  { url: "/generator", name: "Embedding Generator", icon: "Data", key: "embedding_generator" },
  { url: "/bulk-generator", name: "Bulk Embedding Generator", icon: "Bulk", key: "bulk_emedding_generator" },
  { url: "/data-classification", name: "Data Classification", icon: "Data", key: "data_classification" },
  { url: "/bulk-classification", name: "Bulk Data Classification", icon: "Bulk", key: "bulk_data_classification" },
  { url: "/data-storage", name: "Data Storage", icon: "Database", key: "data_storage" },
  { url: "/to-json", name: "to JSON", icon: "Data", key: "to_json" },
  { url: "/to-jsonl", name: "to JSONL", icon: "Data", key: "to_jsonl" },
  { url: "/to-csv", name: "to CSV", icon: "Data", key: "to_csv" },
];

export const App: React.FunctionComponent = () => {
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
            <DataGenForm/>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};