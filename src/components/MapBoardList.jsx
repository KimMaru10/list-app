import React from "react";

const MapBoardList = ({boardList}) => {
    if (boardList) {
      return (
        <ul>
          {boardList.map((board) => (
            <li key={board.id}>
              <Link to={`/board/${board.id}`}>{board.title}</Link>
            </li>
          ))}
        </ul>
      );
    }else{
      return <p>게시글 목록이 비어 있습니다.</p>;
    }
  };
export default MapBoardList;