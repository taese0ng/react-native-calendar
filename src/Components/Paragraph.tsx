import {FlexStyle, Platform, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export const DEFAULT_TEXT_COLOR = 'black';

interface TextProps {
  color?: string;
  textAlign?: 'center' | 'right' | 'left' | 'inherit';
  fontFamily?:
    | 'Poppins'
    | 'Poppins-Regular'
    | 'Poppins-Bold'
    | 'Apple SD Gothic Neo'
    | 'AppleSDGothicNeo-Bold';
  fontWeight?: 'bold' | 'normal';
  style?: StyleProp<FlexStyle | TextStyle>;
  fontSize?: number;
}

export const Paragraph: React.FC<TextProps> = ({
  children,
  style,
  ...restProps
}) => {
  return (
    <Text style={style} {...restProps}>
      {children}
    </Text>
  );
};

const Text = styled.Text<TextProps>`
  font-family: ${(props: TextProps) =>
    Platform.OS === 'web'
      ? props.fontFamily || 'Spoqa Han Sans'
      : props.fontFamily || 'Apple SD Gothic Neo'};
  font-weight: ${(props: TextProps) =>
    props.fontWeight ? props.fontWeight : 'normal'};
  font-size: ${(props: TextProps) =>
    props.fontSize ? props.fontSize + 'px' : '12px'};
  color: ${(props: TextProps) => props.color || DEFAULT_TEXT_COLOR};
  ${(props: TextProps) => props.textAlign && `text-align: ${props.textAlign}`};
`;
