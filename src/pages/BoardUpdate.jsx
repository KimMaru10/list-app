import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoard, updateBoard } from "../apis/axios.js";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [board, setBoard] = useState({
    title: "",
    createdBy: "",
    content: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // 게시글 정보 불러오기
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await getBoard(id);
        if (response.data) {
          const { title, createdBy, content, imageUrls } = response.data;
          setBoard({ title, createdBy, content, images: imageUrls });
        }
      } catch (error) {
        console.error("게시글 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchBoard();
  }, [id]);

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
    const newImages = event.target.files;
    setNewImages([...newImages, ...newImages]);

    // 새로운 이미지에 대한 미리 보기 생성
    const previews = [];
    for (let i = 0; i < newImages.length; i++) {
      previews.push(URL.createObjectURL(newImages[i]));
    }
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // 기존 이미지 클릭하여 삭제
  const handleDeleteImage = (index) => {
    const deletedImageUrl = board.images[index]; // 삭제될 이미지의 경로

    setDeletedImageUrls((deletedImageUrls) => [
      ...deletedImageUrls,
      deletedImageUrl,
    ]);

    const updatedImages = [...board.images];
    updatedImages.splice(index, 1);
    setBoard((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  // 미리 보기에서 이미지 삭제
  const handleDeletePreview = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const deletedImageUrl = newImages[index];
    setNewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setDeletedImageUrls(
      (prevUrls) => prevUrls + (prevUrls ? "," : "") + deletedImageUrl
    );
  };

  //게시글 저장
  const updateBoardHandler = async () => {
    try {
      const formData = new FormData(); //formData 객체 생성
      formData.append("title", board.title);
      formData.append("content", board.content);
      formData.append("createdBy", board.createdBy);

      if (newImages.length != 0) {
        newImages.forEach((image) => {
          formData.append("images", image); // 새로운 이미지 파일을 FormData에 추가
        });
      } else {
        formData.append("images", []);
      }

      formData.append("deletedImageUrls", deletedImageUrls); // 삭제된 이미지 파일의 URL을 FormData에 추가

      const response = await updateBoard(id, formData); // FormData 객체를 전달하여 게시글 수정
      if (response) {
        alert("수정되었습니다.");
        navigate("/boardList/");
      }
    } catch (error) {
      console.error("게시글 수정 오류:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  // 게시판 돌아가기
  const backToList = () => {
    navigate("/boardList");
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
        <h3>기존 이미지 미리 보기</h3>
        {/* 기존 이미지 미리 보기 */}
        {board.images.map((image, index) => (
          <div key={index} style={{ display: "inline-block" }}>
            <img
              src={image}
              alt={`image-${index}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
            <button onClick={() => handleDeleteImage(index)}>삭제</button>
          </div>
        ))}
      </div>
      <br />
      <div>
        <h3>새로운 이미지 미리 보기</h3>
        {/* 새로운 이미지 미리 보기 */}
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ display: "inline-block" }}>
            <img
              src={preview}
              alt={`image-preview-${index}`}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
            <button onClick={() => handleDeletePreview(index)}>삭제</button>
          </div>
        ))}
      </div>
      <br />
      <div>
        <button onClick={updateBoardHandler}>수정</button>
        <button onClick={backToList}>취소</button>
      </div>
    </div>
  );
};

export default BoardUpdate;
