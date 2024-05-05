import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBoardList } from "../apis/axios.js";

const BoardWrite = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    title: "",
    createdBy: "",
    content: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  // 제목, 작성자, 내용의 입력 값을 업데이트하는 함수
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBoard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 이미지를 선택할 때마다 이미지를 상태에 추가하고 미리 보기 생성
  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    setBoard((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...selectedImages],
    }));

    // 미리 보기 생성
    const previews = [];
    for (let i = 0; i < selectedImages.length; i++) {
      previews.push(URL.createObjectURL(selectedImages[i]));
    }
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  //게시글 저장
  const addBoardHandler = async () => {
    try {
      const formData = new FormData(); //formData 객체 생성
      formData.append("title", board.title);
      formData.append("content", board.content);
      formData.append("createdBy", board.createdBy);
      board.images.forEach((image) => {
        formData.append("images", image); // 이미지 파일을 FormData에 추가
      });
      const response = await addBoardList(formData); // FormData 객체를 전달하여 게시글 등록
      if (response) {
        alert("등록되었습니다.");
        navigate("/boardList");
      }
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
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
        <label htmlFor="images">이미지 선택:</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <br />
      <div>
        {/* 이미지 미리 보기 */}
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`image-preview-${index}`}
            style={{ width: "100px", height: "100px", marginRight: "10px" }}
          />
        ))}
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
