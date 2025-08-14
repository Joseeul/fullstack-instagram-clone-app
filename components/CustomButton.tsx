import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  label: string;
  className: string;
  onPress: () => void;
  buttonClassname: string;
  textClassName: string;
  fontFamily: string
}

const CustomButton = ({
  label,
  className,
  onPress,
  buttonClassname,
  textClassName,
  fontFamily
}: CustomButtonProps) => {
  return (
    <View className={className}>
      <TouchableOpacity
        className={buttonClassname}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text className={textClassName} style={{fontFamily: fontFamily || "System"}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
