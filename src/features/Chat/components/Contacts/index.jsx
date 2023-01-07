import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Input } from "antd";
import ContactItem from "../ContactItem";

Contacts.propTypes = {
    people: PropTypes.array,
    current: PropTypes.object,
    handleCurrentPeople:PropTypes.func
};
Contacts.defaultProps = {
    people: null,
    current: null,
    handleCurrentPeople:null
};

function Contacts(props) {
    const { people, current,handleCurrentPeople } = props;
    const handleClickContact = (user) => {
        handleCurrentPeople(user);
    };
    return (
        <div className={styles.main}>
            <div className={styles.featuresContact}>
                <Input.Group compact style={{ width: "90%" }}>
                    <Input.Search allowClear defaultValue="" placeholder="Search contacts" />
                </Input.Group>
            </div>
            <ul style={{ padding: "5px 10px", listStyleType: "none" }}>
                {people.map((x,idx) => (
                    <li key={idx}>
                        <ContactItem
                            current={current}
                            handleClickContact={
                                current.id !== x.id
                                    ? handleClickContact 
                                    : () => {
                                          return;
                                      }
                            }
                            data={x}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Contacts;
