import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBoardList } from "../apis/axios.js";
const BoardList = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [showlist, setShowList] = useState(false);
  const fetchBoardList = async () => {
    try {
      const resp = await getBoardList(); // axios 모듈에서 데이터 가져오기
      setBoardList(resp.data);
      setShowList(true);
    } catch (error) {
      console.error("리스트 불러오기 실패", error);
    }
  };
  useEffect(() => {
    fetchBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

  const moveToWrite = () => {
    navigate("/write");
  };

  return (
    <div>
      {showlist ? (
        <ul>
          {boardList &&
            boardList.map((board) => (
              <li key={board.id}>
                <Link to={`/board/${board.id}`}>{board.title}</Link>
              </li>
            ))}
        </ul>
      ) : (
        <h2>loading...</h2>
      )}
      <div>
        <button onClick={moveToWrite}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;
