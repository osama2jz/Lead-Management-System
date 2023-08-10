import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: "10px",
    padding: "1rem",
    cursor: "pointer",
    backgroundColor: theme.colors.primary,
  },
  iconContainer: {
    backgroundColor: "black",
    borderRadius: "50%",
    padding: "1rem",
  },
}));
