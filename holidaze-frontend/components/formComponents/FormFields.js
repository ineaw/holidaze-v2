import { Field } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

export const TextField = ({
  placeholder,
  name,
  defaultValu,
  type,
  textbox,
  multiple,
  value,
  NumberInput,
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        return (
          <FormControl isInvalid={meta.error && meta.touched} my="1em">
            {textbox ? (
              <Textarea
                {...field}
                variant="outline"
                id={name}
                placeholder={placeholder}
                errorBorderColor="red.300"
                height={["200px", "100px"]}
                bg="#fff"
                borderColor="brand.text"
                border="2px"
              />
            ) : (
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                type={type}
                variant="outline"
                errorBorderColor="red.300"
                bg="#fff"
                borderColor="brand.text"
                border="2px"
              />
            )}
            <FormErrorMessage fontSize="xxs">{meta.error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

TextField.defaultProps = {
  placeholder: "",
  type: "text",
  textbox: false,
  multiple: false,
  value: "",
};
