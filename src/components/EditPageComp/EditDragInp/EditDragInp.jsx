import { useEffect, useState } from "react";
import dragInpImage from "../../../assets/EditPage/dragInpImage.svg";

import styles from "./EditDrag.module.scss";
import { postImage } from "../../../api/EditApi";

const EditDragInp = ({ imageId, setImageId, url }) => {
  const [photo, setPhoto] = useState(url);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setPhoto(url);
  }, [url]);

  useEffect(() => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }, [files]);

  // const handlePhoto = (event) => {
  //   const selectedPhoto = event.target.files[0];
  //   setImageData(selectedPhoto);

  //   if (selectedPhoto) {
  //   }
  // };

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", files[0]);

    postImage(formData)
      .then((res) => {
        if (res.status === 201) {
          setImageId(res.data.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [files]);

  const handleFileSelect = (event) => {
    const fileList = event.target.files;
    setFiles([...fileList]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    setFiles([...fileList]);
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
      className={styles.main}
    >
      {photo ? (
        <img className={styles.image} src={photo} alt="" />
      ) : (
        <div className={styles.imageDiv}>
          <img src={dragInpImage} alt="" />
          <p>Загрузить фото</p>
        </div>
      )}
      <input
        type="file"
        id="fileUpload"
        name="fileUpload"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
      />
    </label>
  );
};

export default EditDragInp;
