import { Box, useRadio, Button } from "@chakra-ui/react";

const RadioField = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "#000000",
          color: "white",
          borderColor: "#000000",
        }}
        px={[3, 4, 5]}
        py={[1.5, 2, 3]}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioField;
