import React from 'react';
import * as icons from '@ant-design/icons';
import { IconProps } from '@ant-design/icons/lib/components/IconBase';

export interface BaseIconProps extends Omit<IconProps, 'icon'> {
  name: string;
}
const Icon = (props: BaseIconProps) => {
  const { name } = props;
  const antIcon: Record<string, any> = icons;
  return React.createElement(antIcon[name], props);
};

export default Icon;
