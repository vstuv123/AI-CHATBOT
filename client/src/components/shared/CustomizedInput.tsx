import { TextField, useMediaQuery, useTheme } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
  required: boolean;
};

const CustomizedInput = (props: Props) => {
  const theme = useTheme();

  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: {
          color: "white",
          fontSize: isVerySmallScreen
            ? "12px"
            : isSmallScreen
            ? "14px"
              : isMediumScreen
              ? "17px"
            : "20px",
          width: isVerySmallScreen
            ? "250px"
            : isMediumScreen
            ? "300px"
            : "400px",
          borderRadius: 10,
        },
      }}
      name={props.name}
      type={props.type}
      label={props.label}
      required={props.required}
    />
  );
};

export default CustomizedInput;
