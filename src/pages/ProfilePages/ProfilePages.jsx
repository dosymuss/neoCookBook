import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Categories from "../../components/Categories/Categories/Categories";
import Header from "../../components/Header/Header";
import userAvatar from "../../assets/ProfileImage/userAvatar.svg";
import Container from "../../ui/Container/Container";
import userNoneImage from "../../assets/profilePage/userNoneProfilePageIcon.svg";

import styles from "./ProfilePages.module.scss";
import Card from "../../ui/Card/Card";

const ProfilePages = () => {
  const { id } = useParams();

  const { fetchGetOtherProfileInfo } = useActions();

  useEffect(() => {
    fetchGetOtherProfileInfo(id);
  }, [id]);

  const otherProfileInfo = useSelector((state) => state.profile.otherProfile);

  console.log(otherProfileInfo);

  if (Object.keys(otherProfileInfo).length > 0) {
    return (
      <div>
        <Header />
        <Categories />
        <Container>
          <div className={styles.userDiv}>
            <img
              className={styles.userImage}
              src={
                otherProfileInfo.avatar
                  ? otherProfileInfo.avatar.file
                  : userNoneImage
              }
              alt=""
            />

            <p className={styles.username}>{otherProfileInfo.username}</p>
          </div>

          <p className={styles.title}>Добавленные рецепты</p>
        </Container>
        {otherProfileInfo &&
          otherProfileInfo.recipes.length > 0 &&
          otherProfileInfo.recipes.map((item) => (
            <Card key={item.id} recipe={item} />
          ))}
      </div>
    );
  }
};

export default ProfilePages;
