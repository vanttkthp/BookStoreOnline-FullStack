import React, { useState } from "react";
function ImagePreview() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const previewImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <div className="form-group">
        <input type="file" onChange={previewImage} className="mb-3" />
      </div>
      <div className="form-group">
        <img id="preview" src={previewUrl} alt="Preview" />
      </div>
  </div>
  );
}
export default ImagePreview;
