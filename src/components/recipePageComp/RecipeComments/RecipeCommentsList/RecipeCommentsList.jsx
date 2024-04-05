import { useState } from "react";
import userNoneImg from "../../../../assets/recipePage/userNoneImg.svg";
import { formatDateTime } from "../../../../code/projCode/projCode";

import styles from "./RecipeCommentsList.module.scss";

const RecipeCommentsItem = ({ comment }) => {
  const time = formatDateTime(comment.created_at, 6);

  return (
    <div>
      <div className={styles.imgAndNameWrap}>
        <img
          className={styles.img}
          src={comment.user.avatar ? comment.user.avatar.file : userNoneImg}
          alt=""
        />
        <div>
          <p>{comment.user.username}</p>
          <p>{time}</p>
        </div>
      </div>
      <p className={styles.comment}>{comment.text}</p>
    </div>
  );
};

export default RecipeCommentsItem;
