import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import GroupBox from "../../../../components/GroupBox";
import styles from "./styles.module.css";
FilterGroups.propTypes = {
    data: PropTypes.array,
    status: PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired,

};
FilterGroups.defaultProps = {
    data: [],
};

function FilterGroups({ data, status,handleClick }) {
    

    const handleFeatureClick=(key,idGroup)=>{
        if(handleClick) handleClick(key,idGroup);
    }

    return (
        <Row gutter={[20, 20]} className={styles["list-group"]}>
            {data.map((item) => {
                return (
                    <Col
                        xs={16}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={6}
                        xxl={4}
                        key={item._id}
                        className={styles["group-item"]}
                    >
                        <GroupBox
                            idGroup={item._id}
                            status={status}
                            handleFeatures={handleFeatureClick}
                            nameGroup={item.name}
                            members={item.member}
                          
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default FilterGroups;
