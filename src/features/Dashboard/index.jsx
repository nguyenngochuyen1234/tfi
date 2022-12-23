import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Layout } from 'antd';
import classNames from 'classnames';
import Board from './components/Board';
import Overview from './components/Overview';
FeatureDashBoard.propTypes = {
    
};

function FeatureDashBoard(props) {
    return (
        <div className={classNames({
            [styles["feature-container_right"]]:true,
            [styles.root]:true
        })}>
            <Layout className={styles.board}>
                <Board/>
            </Layout>
            <div className={styles.overview}>
               <Overview/>
            </div>
        </div>
    );
}

export default FeatureDashBoard;