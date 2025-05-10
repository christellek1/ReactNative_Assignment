import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextLinkProps } from './TextLink.types';

const TextLink: React.FC<TextLinkProps> = ({
  text,
  linkText,
  onPress,
  textStyle,
  linkStyle,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={linkStyle}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextLink;
