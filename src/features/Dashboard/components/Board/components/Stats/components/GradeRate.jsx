import React from "react";
import PropTypes from "prop-types";
import { Progress } from "antd";

GradeRate.propTypes = {
    percent: PropTypes.number.isRequired,
};

function GradeRate({ percent }) {
    return (
        <div>
            <Progress
                className="text-lg"
                style={{
                    fontWeight: "bold",
                    marginLeft: "44px",
                }}
                width={80}
                type="circle"
                percent={percent}
                format={(percent) => (
                    <span style={{ color: "var(--color--text-default)" }}>
                        {(() => {
                            if (percent > 90) {
                                return "S+";
                            }
                            if (percent > 70) {
                                return "S";
                            }
                            if (percent > 40) {
                                return "A+";
                            }
                            if (percent > 20) {
                                return "A";
                            }
                            if (percent > 0) {
                                return "C";
                            }
                        })()}
                    </span>
                )}
            />
        </div>
    );
}

export default GradeRate;
