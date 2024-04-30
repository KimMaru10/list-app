import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoardList } from '../apis/axios';

const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const fetchBoardList = async () => {
    try {
      const data = await getBoardList(); // axios 모듈에서 데이터 가져오기
      setBoardList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const moveToWrite = () => {
    navigate('/write');
  };
  useEffect(() => {
    fetchBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

  return (
    <div>
      <ul>
        {boardList.map((board) => (
          // 4) map 함수로 데이터 출력
          <Link to={`/board/${board.id}`}>{board.title}</Link>
        ))}
      </ul>
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;