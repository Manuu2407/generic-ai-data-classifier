import React from "react";
import { FluentProvider, webLightTheme, Text, makeStyles } from "@fluentui/react-components";
import { DataGenForm } from "./routes/DataGenForm";
import { Nav } from "@fluentui/react";

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
  { url: "/generator", name: "Embedding Generator", key: "embedding_generator" },
  { url: "/bulk-generator", name: "Bulk Embedding Generator", key: "bulk_embedding_generator" },
  { url: "/data-classification", name: "Data Classification", icon: "Data", key: "data_classification" },
  { url: "/bulk-classification", name: "Bulk Data Classification", icon: "Bulk", key: "bulk_data_classification" },
  { url: "/data-storage", name: "Data Storage", icon: "Database", key: "data_storage" },
  { url: "/to-json", name: "to JSON", icon: "Data", key: "to_json" },
  { url: "/to-jsonl", name: "to JSONL", icon: "Data", key: "to_jsonl" },
  { url: "/to-csv", name: "to CSV", icon: "Data", key: "to_csv" },
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
            <DataGenForm />
          </main>
        </div>
      </div>
    </FluentProvider>
  );
};
