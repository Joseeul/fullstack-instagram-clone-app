import React from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputFieldProps {
  label: string;
  className: string;
  textClassName: string;
  textInputClassName: string;
  fontFamily: string;
  onChangeText: (text: string) => void;
  value: string;
}

const CustomInputField = ({
  label,
  className,
  textClassName,
  textInputClassName,
  fontFamily,
  onChangeText,
  value,
}: CustomInputFieldProps) => {
  return (
    <View className={className}>
      <View className={textInputClassName}>
        <Text
          className={textClassName}
          style={{ fontFamily: fontFamily || "System", marginBottom: 3 }}
        >
          {label}
        </Text>
        <TextInput onChangeText={onChangeText} value={value} />
      </View>
    </View>
  );
};

export default CustomInputField;
