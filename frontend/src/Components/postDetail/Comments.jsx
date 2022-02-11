import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Comment, { ProfileImg } from "./Comment";
import ReplyComment from "./ReplyComment";
import axios from "axios";
import { authAtom, userIdAtom, userImage } from "../../states";
import { useRecoilState, useRecoilValue } from "recoil";
import { commentAtom } from "../../states/comment";

const CommentsWrapper = styled.div`
  padding: 10px 12px 0;
  & > form {
    display: flex;
    margin-bottom: 10px;
  }
`;

const AuthInput = styled.input`
  position: relative;
  flex: 1;
  border: none;
  height: 29px;
  align-self: center;
  border-bottom: 1px solid #a5a8b126;
  animation: border-bottom 1.5s linear;
  &:focus {
    outline: none;
    border-bottom-color: #a5a8b1;
  }
`;

const CommentLink = styled(Link)`
  flex: 1;
  position: relative;
  color: #a5a8b1;
  text-decoration: none;
  align-self: center;
  font-size: 13px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -5px;
    height: 2px;
    background-color: #a5a8b126;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.theme.mainColor};
  padding: 10px 20px;
  color: #fff;
`;

const Count = styled.span`
  margin-left: 4px;
  font-size: 16px;
  font-weight: normal;
`;

const CommentInputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 17px 0;
`;

const Input = styled.input`
  padding: 10px 18px;
  width: 210px;
  height: 36px;
  border-radius: 14px;
  background-color: #eee;
  border: none;
  font-size: 12px;
`;

const InputButton = styled.button`
  font-size: 12px;
  height: 36px;
  width: 45px;
  margin-left: 10px;
  background-color: #feae11;
  border: none;
  border-radius: 13px;
  color: white;
`;

const More = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  padding: 15px 0;
  border-top: 1px solid lightgray;
  margin-top: 4px;
`;

const EmptyComment = styled.div`
  padding: 10px 0;
  color: #a5a8b1;
`;

const Comments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useRecoilState(commentAtom);
  const commentLength = useMemo(() => comments.length, [comments]);
  const { postId } = useParams();
  const isLogin = useRecoilValue(userIdAtom);
  const userImg = useRecoilValue(userImage);
  const url = `/comment/${postId}/detail`;
  const [write, setWrite] = useState("");

  useEffect(() => {
    // 원래 useEffect안에는 async-await을 사용하지 못하지만
    // 즉시실행함수로 함수를 만든 후 실행함으로써 해결할 수 있음
    // async를 useEffect에 그대로 전달하면 구조상 프로미스를 반환할 수 밖에 없고, 이펙트 함수에는 클린업 함수를 리턴해야한다는데
    // 리액트가 받는건 덜렁 프라미스로 대체된다고 합니다.
    (async () => {
      const { data } = await axios(`${url}`);
      setComments(data.comments);
      setIsLoading(false);
    })();
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setWrite(value);
  };
  console.log(write);
  console.log(!isLogin, isLogin);

  return (
    <>
      {!isLoading && (
        <>
          <Title>
            댓글 <Count>{commentLength}</Count>
          </Title>
          <CommentsWrapper>
            <form>
              <ProfileImg isImage={userImg} />
              {!isLogin ? (
                <CommentLink to="/login">공개 댓글 추가...</CommentLink>
              ) : (
                <AuthInput
                  value={write}
                  onChange={onChangeHandler}
                  placeholder="공개 댓글 추가..."
                  type="text"
                />
              )}
            </form>
            {comments.slice(0, 3).map((comment) => (
              <Comment key={comment._id} comment={comment} isMore={false} />
            ))}
            {commentLength === 0 ? (
              <EmptyComment>아직 작성된 댓글이 없어요</EmptyComment>
            ) : commentLength > 3 ? (
              <More to="./comments">댓글 더보기</More>
            ) : null}
          </CommentsWrapper>
        </>
      )}
    </>
  );
};
export default Comments;
