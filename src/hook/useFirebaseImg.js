import { useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useFirebaseImg = (setValue, getValues) => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    setValue("name_image", file.name);
    if (!file) return;
    handleUploadImage(file);
  };

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        console.log("Upload is " + progressPercent + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Not file");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          // toast.success("Upload success");
        });
      }
    );
  };
  const handleDeleteImg = () => {
    const storage = getStorage();

    const desertRef = ref(storage, "images/" + getValues("name_image"));

    setImage("");
    setProgress(0);
    deleteObject(desertRef)
      .then(() => {
        console.log("Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return {
    progress,
    image,
    handleDeleteImg,
    onSelectImage,
    setImage,
    setProgress,
  };
};

export default useFirebaseImg;
