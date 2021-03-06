import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { SourceListAtom } from "../../PostAtom/PostAtom";
import { ResetTextarea } from "../../commonStyle";
import { useFormContext } from "react-hook-form";

const SourceList = ({ data }) => {
  const [SourceList, setSourceList] = useRecoilState(SourceListAtom);

  const { register, setValue } = useFormContext();
  const deleteIngredient = (index) => {
    setValue(`source_${index + 1}`, "");
    setValue(`sourceVolume_${index + 1}`, "");
    setSourceList((oldList) => {
      const newList = oldList.filter(function (el, i) {
        return index !== i;
      });
      return newList;
    });
  };
  useEffect(() => {
    if (SourceList.length < data.seasoning.length) {
      for (let i = 0; i < data.seasoning.length - 1; i++) {
        setSourceList((oldList) => {
          const newList = [
            ...oldList,
            {
              key: new Date().getTime(),
            },
          ];
          return newList;
        });
      }
    }
  }, []);

  return (
    <>
      {SourceList.map((item, index) => {
        return (
          <Wrapper key={`source_wrapper_${index}`}>
            <Ingredient
              {...register(`source_${index + 1}`)}
              placeholder="ex) 간장"
              key={`source_${index}`}
              defaultValue={
                index + 1 <= data.seasoning.length ? data.seasoning[index].ingreName : ""
              }
            ></Ingredient>
            <Volume
              {...register(`sourceVolume_${index + 1}`)}
              placeholder="한 큰술"
              key={`source_volume_${index}`}
              defaultValue={
                index + 1 <= data.seasoning.length ? data.seasoning[index].ingreCount : ""
              }
            ></Volume>
            {index + 1 === SourceList.length && (
              <DeleteBtn
                key={`DeleteBtn_${index}`}
                onClick={() => {
                  deleteIngredient(index);
                }}
              >
                x
              </DeleteBtn>
            )}
          </Wrapper>
        );
      })}
    </>
  );
};

export default SourceList;

const Wrapper = styled.div`
  display: flex;
  + div {
    margin-top: 10px;
  }
  position: relative;
`;

const DeleteBtn = styled.div`
  width: 10px;
  position: absolute;
  right: -20px;
  color: #6666;
`;

const Ingredient = styled.textarea`
  width: 166px;
  height: 59px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea};
`;

const Volume = styled.textarea`
  width: 107px;
  height: 59px;
  border: 1px solid #feae11;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 0px 0px 25px;
  font-size: 1rem;
  font-weight: bold;
  ${ResetTextarea}
  margin-left : 5px;
`;
