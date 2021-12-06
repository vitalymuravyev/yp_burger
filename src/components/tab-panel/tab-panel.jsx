import React, { useState } from "react";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-panel.module.css';

import { ingredientTypes } from '../../utils/data';

const TABS = ['bun', 'sauce', 'main'];

export const TabPanel = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  return (
    <div className={styles.wrapper}>
      {TABS.map((tab, index) =>
        <Tab key={index} active={currentTab === tab} value={tab} onClick={setCurrentTab}>
          {ingredientTypes[tab]}
        </Tab>
      )}
    </div>
  );
};
