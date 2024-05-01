import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '../apis/axios.js';
const Board = ({ id, title, contents, createdBy , imageUrls}) => {
  const navigate = useNavigate();

  const moveToUpdate = () => {
    navigate('/update/' + id);
  };

  const handelDeleteBoard = async () => {
    if(window.confirm("게시글을 삭제 하시겠습니까?")){
      const success = await deleteBoard(id); // 삭제 요청 보내기
          if (success) {
              alert('삭제되었습니다.');
              navigate('/board'); // 삭제 성공 시 페이지 이동
          } else {
              alert('삭제 실패했습니다.'); // 삭제 실패 시 알림
      }
    }
  };

  const moveToList = () => {
    navigate('/board');
  };

  return (
    <div>
      <h2>{title}</h2>
      <h5>{createdBy}</h5>
      <hr/>
      <p>{contents}</p>
      <hr/>
      {imageUrls.length > 0 && (
        <div>
          <h3>첨부된 이미지</h3>
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index + 1}`} 
            style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }}/>
          ))}
        </div>
      )}
      <div>
        <button onClick={moveToUpdate}>수정</button>
        <button onClick={handelDeleteBoard}>삭제</button>
        <button onClick={moveToList}>목록</button>
      </div>
    </div>
  );
};

export default Board;