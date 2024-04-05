import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Container from "../../../ui/Container/Container";
import Card from "../../../ui/Card/Card";
import { getMyBookmark } from "../../../api/profileApi";

import styles from "./ProfileList.module.scss";

const ProfileList = () => {
  const [tab, setTab] = useState("my");
  const [bookmark, setBookmark] = useState([]);
  useEffect(() => {
    getMyBookmark().then((res) => {
      console.log(res);
      setBookmark(res.data.list);
    });
  }, []);

  const myProfile = useSelector((state) => state.profile.profile);

  return (
    <>
      <Container>
        <div>
          <div className={styles.btnDiv}>
            <button
              className={tab !== "my" ? styles.btn : styles.btnAcc}
              onClick={() => setTab("my")}
            >
              Мои рецепты
            </button>
            <button
              className={tab !== "save" ? styles.btn : styles.btnAcc}
              onClick={() => setTab("save")}
            >
              Сохраненные рецепты
            </button>
          </div>
        </div>
      </Container>
      <div>
        {tab === "my"
          ? myProfile.recipes.length > 0 &&
            myProfile.recipes.map((item) => (
              <Card key={item.id} recipe={item} />
            ))
          : bookmark.length > 0 &&
            bookmark.map((item) => <Card key={item.id} recipe={item} />)}
      </div>
    </>
  );
};

export default ProfileList;
