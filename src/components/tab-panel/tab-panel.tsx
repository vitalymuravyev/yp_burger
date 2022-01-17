import React, { FC } from "react";

import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './tab-panel.module.css';

import { ingredientTypes } from '../../utils/constants';
import {TIngredientTypeName} from "../../utils/types";

const TABS: Array<TIngredientTypeName> = ['bun', 'sauce', 'main'];

type TTabPanelProps = {
  currentTab: TIngredientTypeName;
  setTab: (a: string) => void;
}

export const TabPanel: FC<TTabPanelProps> = ({currentTab, setTab}) => {

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
