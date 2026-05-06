
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Solution {
  title: string;
  description: string;
  items: string[];
  image: string;
  color: 'lime' | 'white' | 'solarBlue';
}

export interface Project {
  title: string;
  category: string;
  img: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string; // Icon name from lucide
}
