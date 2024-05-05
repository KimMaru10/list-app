// BoardWrite.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBoardList } from "../apis/axios.js";
import { Images } from "../components";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    title: "",
    createdBy: "",
    content: "",
    images: [],
  });

  // 제목, 작성자, 내용의 입력 값을 업데이트하는 함수
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 이미지 리스트를 업데이트하는 함수
  const handleImagesChange = (images) => {
    setBoard((prevState) => ({
      ...prevState,
      images: images,
    }));
  };

  //게시글 저장
  const addBoardHandler = async () => {
    try {
      const formData = new FormData(); //formData 객체생성
      formData.append("title", board.title);
      formData.append("content", board.content);
      formData.append("createdBy", board.createdBy);
      board.images.forEach((image) => {
        formData.append("images", image); // 이미지 파일을 FormData에 추가
      });
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await addBoardList(formData); // FormData 객체를 전달하여 게시글 등록
      if (response) {
        alert("등록되었습니다.");
        navigate("/board");
      }
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  // 게시판 돌아가기
  const backToList = () => {
    navigate("/board");
  };

  return (
    <div>
      <div>
        <span>제목</span>
        <input
          type="text"
          name="title"
          value={board.title}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <span>작성자</span>
        <input
          type="text"
          name="createdBy"
          value={board.createdBy}
          onChange={handleChange}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
          value={board.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        {/* Images 컴포넌트를 렌더링하여 이미지를 업로드합니다. */}
        <Images setImages={handleImagesChange} />
      </div>
      <br />
      <div>
        <button onClick={addBoardHandler}>저장</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardWrite;
