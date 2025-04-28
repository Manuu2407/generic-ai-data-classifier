import React from "react";
import { FluentProvider, webLightTheme, Text, makeStyles } from "@fluentui/react-components";
import { DataGenForm } from "./routes/DataGenForm";
import { DataStorage } from "./routes/DataStorage";
import { Nav } from "@fluentui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BulkDataGenForm } from "./routes/BulkDataGenForm";
import { DataClassificationForm } from "./routes/DataClassificationForm";
import { BulkDataClassificationForm } from "./routes/BulkDataClassificationForm";
import { JSON_Parser } from "./routes/JSON_Parser";
import { JSONL_Parser } from "./routes/JSONL_Parser";
import { CSV_Parser } from "./routes/CSV_Parser";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    backgroundColor: webLightTheme.colorBrandBackground,
    color: webLightTheme.colorNeutralForegroundOnBrand,
    padding: "1rem",
    textAlign: "center",
  },
  layout: {
    display: "flex",
    flexGrow: 1,
  },
  nav: {
    width: "200px",
    borderRight: `1px solid ${webLightTheme.colorNeutralStroke2}`,
    backgroundColor: webLightTheme.colorNeutralBackground1,
    padding: "1rem 0",
  },
  content: {
    flexGrow: 1,
    padding: "1rem",
  },
});

const pages = [
  {
    url: "/generator",
    name: "Embedding Generator",
    key: "embedding_generator",
    page: <DataGenForm />,
  },
  {
    url: "/bulk-generator",
    name: "Bulk Embedding Generator",
    key: "bulk_embedding_generator",
    page: <BulkDataGenForm />,
  },
  {
    url: "/data-classification",
    name: "Data Classification",
    icon: "Data",
    key: "data_classification",
    page: <DataClassificationForm />,
  },
  {
    url: "/bulk-classification",
    name: "Bulk Data Classification",
    icon: "Bulk",
    key: "bulk_data_classification",
    page: <BulkDataClassificationForm />,
  },
  {
    url: "/data-storage",
    name: "Data Storage",
    icon: "Database",
    key: "data_storage",
    page: <DataStorage />,
  },
  { url: "/to-json", name: "to JSON", icon: "Data", key: "to_json", page: <JSON_Parser /> },
  { url: "/to-jsonl", name: "to JSONL", icon: "Data", key: "to_jsonl", page: <JSONL_Parser /> },
  { url: "/to-csv", name: "to CSV", icon: "Data", key: "to_csv", page: <CSV_Parser /> },
];

export const App: React.FunctionComponent = () => {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = React.useState(pages[0].name);

  const handleNavClick = (ev: any, item: any) => {
    if (item) {
      setCurrentPage(item.url);
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Text size={600} weight="semibold">
            {currentPage}
          </Text>
        </header>
        <div className={styles.layout}>
          <BrowserRouter>
            <nav className={styles.nav}>
              <Nav
                groups={[
                  {
                    links: pages.map((page) => ({
                      url: page.url,
                      name: page.name,
                      key: page.key,
                    })),
                  },
                ]}
                selectedKey={currentPage.toLowerCase()}
                onLinkClick={handleNavClick}
              />
            </nav>
            <main className={styles.content}>
              <Switch>
                {pages.map((page) => (
                  <Route key={page.key} path={page.url}>
                    {page.page}
                  </Route>
                ))}
                {/* Default route */}
                <Route path="/">
                  <DataGenForm />
                </Route>
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      </div>
    </FluentProvider>
  );
};
