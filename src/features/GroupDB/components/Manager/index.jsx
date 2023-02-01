import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
Manager.propTypes = {
    
};

function Manager(props) {
    const navigate=useNavigate()
    const handleClickBack = () => {
        navigate(-1);

    };
    return (
        <div className={styles.managerGroup}>
            <div>
                <Button
                    type="link"
                    className="link-back"
                    onClick={handleClickBack}
                    icon={<LeftOutlined />}
                >
                    Back
                </Button>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Manager;