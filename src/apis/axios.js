import axiosInstance from '/axiosInstance.js';

export const getBoardList = async () => {
    try{
        const response = await axiosInstance.get('/board');
        return response.data;
    }catch(error){
        console.error('리스트 불러오기 실패 : ',error);
    }
};

export const addBoardList = async (boardData) => {
    try{
        const response = await axiosInstance.post('/board', boardData);
        return response.data;
    }catch(error){
        console.error('게시글 저장 실패 : ',error);
    }
}

export const getBoard = async (id) => {
    try{
        const response = await axiosInstance.get(`/board/${id}`);
        return response.data;
    }catch(error){
        console.error('게시글 상세 불러오기 실패 : ',error);
    }
}

export const deleteBoard =async (id) => {
    try{
        await axiosInstance.delete(`/board/${id}`);
        return true;
        
    }catch(error){
        console.error("게시글 삭제 실패 : ",error);
        return false;
    }
}

export const updateBoard = async(id, board) =>{
    try{
        const response = await axiosInstance.patch(`/board/${id}`, board);
        return response.data;
    }catch(error){
        console.error('게시글 수정 실패 : ',error);
    }
}