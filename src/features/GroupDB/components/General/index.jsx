import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PostDetail from "./components/PostDetail";
import ModalPost from "./components/ModalPost";
General.propTypes = {};
const iniiData = [
    {
        idPost: "#123",
        idPeoplePost: "#12qw2",
        avatar: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
        name: "Thắng Dev",
        about: "Cần người đi mua iphone pro 15",
        createdAt: "25/12/2023 7:12",
        comment: [
            {
                idPeoplePost: "#12qw2",
                avatar: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
                name: "Thắng Dev",
                idComment: "#421",
                data: "hello world!",
                createdAt: "25/12/2023 7:12",

                comment: [],
            },
            {
                idPeople: "#12qw4",
                avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
                name: "Zảo xèng hảo bingchiling",
                idComment: "#421",
                data: "Tớ cậu ơi",
                createdAt: "25/12/2023 7:12",

                comment: [],
            },
        ],
        react: [{
            _id:"123$",
            name:"Nguyễn Ngọc Huyền"
        },{
            _id:"1251",
            name:"Dương thị Ngọc Linh"
        },{
            _id:"#12qw4",
            name:"Zảo xèng hảo bingchiling"
        } ,{
            _id:"#12qw2",
            name:"Thắng Dev"
        }]
    },
    {
        idPost: "#124",
        idPeoplePost: "#12qw4",
        avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
        name: "Zảo xèng hảo bingchiling",
        about: `Hiện tại đang là đợt gọi nghĩa vụ quân sự nên có nhiều bạn nhắn hỏi về việc xin “Giấy xác nhận đang học đại học” để hoãn nghĩa vụ quân sự. 
        Trả lời:
        Việc cấp giấy do phòng công tác chính trị sinh viên cấp- các bạn gọi điện đến phòng tiếp sinh viên theo số: 024 35581815 trong giờ hành chính.       
        Các bạn cung cấp thông tin cá nhân và đề nghị xin cấp giấy xác nhận đang học đại học, phòng công tác chính trị sinh viên sẽ làm giấy và scan gửi lại cho các bạn (không cần trực tiếp đến lấy)
        Lưu ý: có một số bạn gọi điện ngoài giờ và phản hồi lại “Em gọi mãi rất nhiều lần phòng tiếp sinh viên không nghe máy”- vậy chúng ta rút kinh nghiệm gọi trong giờ hành chính.`,
        createdAt: "24/12/2023 23:06",
        react: [{
            _id:"123$",
            name:"Nguyễn Ngọc Huyền"
        },{
            _id:"1251",
            name:"Dương thị Ngọc Linh"
        },{
            _id:"#12qw4",
            name:"Zảo xèng hảo bingchiling"
        } ],
        comment: [
            {
                idPeople: "#12qw2",
                avatar: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
                name: "Thắng Dev",
                idComment: "#421",
                createdAt: "25/12/2023 12:12",
                data: "hello world!",
                comment: [],
            },
            {
                idPeople: "#12qw2",
                avatar: "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg",
                name: "Thắng Dev",
                createdAt: "25/12/2023 6:12",

                idComment: "#422",
                data: "Bài viết hay quá ạ",
                comment: [],
            },
        ],
    },
    {
        idPost: "#125",
        idPeoplePost: "#12qw4",
        avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
        name: "Zảo xèng hảo bingchiling",
        about: "Bạn nào ăn bingchiling không ạ. Mình đang ở mixue Linh đàm. Free ship nha mọi người",
        createdAt: "24/12/2023 8:26",
        react:[{
            _id:"123$",
            name:"Nguyễn Ngọc Huyền"
        },{
            _id:"1251",
            name:"Dương thị Ngọc Linh"
        }],
        comment: [
            {
                idPeople: "#12qw4",
                idComment: "#425",
                avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
                name: "Zảo xèng hảo bingchiling",
                data: "hello world!",
                createdAt: "21/02/2024 1:14",

                comment: [],
            },
            {
                idPeople: "#12qw4",
                avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
                name: "Zảo xèng hảo bingchiling",
                idComment: "#427",
                data: "Ronando siuuu!!!",
                createdAt: "1/3/2025 12:22",

                comment: [],
            },
        ],
    },
    {
        idPost: "#126",
        idPeoplePost: "#12qw4",
        avatar: "https://www.studytienganh.vn/upload/2022/05/112273.jpg",
        name: "Zảo xèng hảo bingchiling",
        about: "Gấp gấp mọi người ơi tối nay vào họp nha mọi người ",
        createdAt: "20/12/2023 17:20",
        react: [],
        comment: [],
    },
];
function General(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddPost = () => {
        console.log("add post");
    };
    return (
        <div className={styles.general}>
            <div className={styles.general_header}>
                <Button
                    style={{ marginLeft: "10px" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    New post
                </Button>
                <ModalPost
                    handleAddPost={handleAddPost}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <div className={styles.general_body}>
                {iniiData.map((data) => (
                    <PostDetail key={data.idPost} post={data} />
                ))}
            </div>
        </div>
    );
}

export default General;
