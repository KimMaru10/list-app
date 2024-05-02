import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Board } from "../components";
import { getBoard } from "../apis/axios.js";
const BoardDetail = () => {
  const { id } = useParams(); // /board/:id와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  const fetchBoard = async () => {
    try {
      const resp = await getBoard(id);
      setBoard(resp.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [id]);

  return (
    <div>
      {/* 삼항연산자 */}
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board
          id={board.id}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
          imageUrls={board.imageUrls}
        />
      )}
    </div>
  );
};

export default BoardDetail;
