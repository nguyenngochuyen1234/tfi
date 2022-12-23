import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.css";
import ItemDetail from '../ItemDetail';
DeltailOverview.propTypes = {
    
};

function DeltailOverview(props) {
    return (
        <div className={styles.root}>
            <ItemDetail _thisColor="#6600CC" _thisName="Total projects" _thisCount={186} />
            <ItemDetail _thisColor="red" _thisName="Completed" _thisCount={100} />
            <ItemDetail _thisColor="orange" _thisName="In progress" _thisCount={186} />
            <ItemDetail _thisColor="brown" _thisName="Out of schedule" _thisCount={186} />

        </div>
    );
}

export default DeltailOverview;