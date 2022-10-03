import React from "react";
import { Box } from "@adminjs/design-system";

const font = { fontFamily: "Helvetica, sans-serif" };

const styles = {
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: "34px",
    fontWeight: "bold",
    ...font,
  },
  subtitle: {
    fontSize: "30px",
    marginTop: "20px",
    ...font,
  },
};

const Dashboard = (_props) => {
  return (
    <Box style={styles.mainContainer}>
      <div style={styles.container}>
        <p style={styles.title}>Welcome to the Admin Panel!</p>
        <p style={styles.subtitle}>You can see or edit the data by using the links in the sidebar.</p>
      </div>
    </Box>
  );
};

export default Dashboard;
