import React, { useState } from "react";

import styles from './tab-panel.module.css';

import { ingredientTypes } from '../../utils/data';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const TABS = ['bun', 'sauce', 'main'];

export const TabPanel = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  const handleClick = (value) => {
    setCurrentTab(value)
  };

  return (
    <div className={styles.wrapper}>
      {TABS.map((tab, index) =>
        <Tab key={index} active={currentTab === tab} value={tab} onClick={handleClick}>
          {ingredientTypes[tab]}
        </Tab>
      )}
    </div>
  )
}
