import React from "react";
import PropTypes from 'prop-types';

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-panel.module.css';

import { ingredientTypes } from '../../utils/data';

const TABS = ['bun', 'sauce', 'main'];

export const TabPanel = ({currentTab, setTab}) => {

  return (
    <div className={styles.wrapper}>
      {TABS.map((tab, index) =>
        <Tab key={index} active={currentTab === tab} value={tab} onClick={setTab}>
          {ingredientTypes[tab]}
        </Tab>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired
};
