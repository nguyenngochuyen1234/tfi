import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.css";
import ItemDetail from '../ItemDetail';
DeltailOverview.propTypes = {
    data:PropTypes.array.isRequired,
};

function DeltailOverview({data}) {
    console.log(data)
    return (
        <div className={styles.root}>
            <ItemDetail _thisColor="#6600CC" _thisName="Total Tasks" _thisCount={data.length} />
            <ItemDetail _thisColor="red" _thisName="Completed" _thisCount={data.filter((item)=>item.status==="completed").length} />
            <ItemDetail _thisColor="orange" _thisName="In progress" _thisCount={data.filter((item)=>item.status==="pending").length} />
            <ItemDetail _thisColor="brown" _thisName="Out of schedule" _thisCount={data.filter((item)=>item.status==="past-due").length} />

        </div>
    );
}

export default DeltailOverview;