import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {AdaptiveValue, Rem} from "../../styles/functions/mixins";
import {useAppDispatch, useTypedSelector} from "../../app/store/ReduxStore";
import {setCurrentPage, setCurrentPhoto, toggleIsSlideShow} from '../../app/store/PhotosSlice';
import {useRouter} from "next/router";
import {BiLeftArrow, BiRightArrow} from "react-icons/all";

type ImagePageType = {}

const ImagePage: FC<ImagePageType> = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    let {currentPhoto} = useTypedSelector(state => state.Photos)
    let {currentPage} = useTypedSelector(state => state.Photos)
    let {isPending} = useTypedSelector(state => state.Photos)
    let {photos} = useTypedSelector(state => state.Photos)
    let {isSlideShow} = useTypedSelector(state => state.Photos)


    const SetCurrentPhoto = (id: number) => {
        dispatch(setCurrentPhoto(id))
        router.push(`${id}`).then()
    }

    useEffect(() => {
        if (!currentPhoto) SetCurrentPhoto(1)
    }, [dispatch, currentPhoto, currentPage])
    useEffect(() => {
        if (isPending || !currentPage || !currentPhoto) return
        if (photos.length <= currentPhoto.PhotoId) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }, [dispatch, currentPhoto])

    return <ImagePageWrapper className='imagePage__wrapper'>
        <div className="imagePage__container">
            <div className="image-cont">
                <img src={currentPhoto ? currentPhoto?.urls?.regular : ''}
                     alt=""/>
                {!currentPhoto?.urls?.regular && <span className='preroll'>Loading...</span>}
            </div>
            <div className="bottom-cont">
                <div className="userInfo-cont">

                    <div className="user-photo">
                        <img
                            src={currentPhoto?.user?.profile_image?.medium}
                            alt="user photo"/>
                    </div>
                    <div className='user-info'>
                        <div className="user-names">
                            <h1>{currentPhoto?.user?.name}</h1>
                        </div>
                        <div className="user-insta">
                            <span>insta: {currentPhoto?.user?.instagram_username}</span>
                        </div>
                    </div>
                </div>
                <div className="controls-cont">
                    <BiLeftArrow className='arrow' onClick={() => {
                        SetCurrentPhoto(currentPhoto.PhotoId - 1)
                        dispatch(toggleIsSlideShow(false))
                    }}/>
                    —
                    <BiRightArrow className='arrow' onClick={() => {
                        SetCurrentPhoto(currentPhoto.PhotoId + 1)
                        dispatch(toggleIsSlideShow(false))
                    }}/>

                </div>
            </div>
        </div>
    </ImagePageWrapper>
};
export default ImagePage;
const ImagePageWrapper = styled.div`
  width: 100%;

  .imagePage__container {
    display: flex;
    flex-direction: column;
    width: 100%;


    .image-cont {
      width: 100%;
      height: calc(100vh - 100px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .preroll {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        ${AdaptiveValue("font-size", 30, 20)};
      }


      img {
        transition: .5s;
        object-fit: contain;
        width: 100%;
        height: 100%;
        border: none;
      }

    }


    .bottom-cont {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: ${Rem(20)};
      height: 100px;
      flex-wrap: wrap;
      gap: 20px;

      .userInfo-cont {
        display: flex;
        align-items: center;
        gap: 10px;

        .user-photo {
          img {
            border-radius: 15px;
            width: 60px;
            height: 60px;
          }
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 5px;

          .user-names {
            h1 {
              font-family: "Calibri Light";
              font-weight: 600;
              ${AdaptiveValue("font-size", 22, 15)};
            }
          }

          .user-insta {
            span {
              font-family: "Calibri Light";
              ${AdaptiveValue("font-size", 15, 12)};

            }
          }

        }
      }

      .controls-cont {
        display: flex;
        align-items: center;

        .arrow {
          cursor: pointer;
          ${AdaptiveValue("width", 50, 30)};
          ${AdaptiveValue("height", 50, 30)};
        }
      }
    }
  }
`