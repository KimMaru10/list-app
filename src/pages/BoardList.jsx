import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoardList } from '../apis/axios.js';
const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  
  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const resp = await getBoardList(); // axios 모듈에서 데이터 가져오기
        setBoardList(resp);
      } catch (error) {
        console.error("리스트 불러오기 실패",error);
      }
    };
    fetchBoardList();
  }, []);
  
  
  const moveToWrite = () => {
    navigate('/write');
  };
  

  return (
    <div>
        {boardList && boardList.length > 0 && (
          <ul>
            {boardList.map((board) => (
              // 4) map 함수로 데이터 출력
              <li key={board.id}>
                <Link to={`/board/${board.id}`}>{board.title}</Link>
              </li>
            ))}
          </ul>
        )}
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;