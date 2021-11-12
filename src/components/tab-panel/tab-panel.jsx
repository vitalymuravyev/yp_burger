import React from "react";

import styles from './tab-panel.module.css';

import { ingredientTypes } from '../../utils/data';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const TABS = ['bun', 'sauce', 'main'];

export class TabPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 'bun'}
  }

  handleClick = (value) => {
    this.setState({
      current: value,
    })
  }

  render() {

    return (
      <div className={styles.wrapper}>
        {TABS.map((tab, index) =>
          <Tab key={index} active={this.state.current === tab} value={tab} onClick={this.handleClick}>
            {ingredientTypes[tab]}
          </Tab>
        )}
      </div>
    )
  }
}