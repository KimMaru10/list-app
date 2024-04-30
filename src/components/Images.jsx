import React, { useState } from 'react';

const Images = ({setImages}) => {
  const [showImages, setShowImages] = useState([]);

  // 이미지 추가
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
    setImages(imageUrlLists); //부모 컴포넌트에 전달
  };

  // 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setImages(showImages.filter((_, index) => index !== id)); // 이미지 리스트를 부모 컴포넌트로 업데이트
  };

  return (
    <>
        <div>
        <label htmlFor="input-file">
          <input type="file" id="input-file" onChange={handleAddImages} multiple accept="image/*" />
          <span>사진추가</span>
        </label>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* 저장된 이미지 미리 보기 */}
        {showImages.map((image, id) => (
          <div key={id}>
            <img src={image} alt={`image-${id}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }} />
            <button onClick={() => handleDeleteImage(id)}>삭제</button>
          </div>
        ))}
      </div> 
    </>
  );
};

export default Images;
