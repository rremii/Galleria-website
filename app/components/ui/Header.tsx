import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import Image from 'next/image'
import logo from '../../assets/logo.svg'
import {Rem} from '../../../styles/functions/mixins'
import {useRouter} from "next/router";
import {useAppDispatch, useTypedSelector} from "../../store/ReduxStore";
import {fetchPhotos, setCurrentPage, setCurrentPhoto, toggleIsSlideShow} from "../../store/PhotosSlice";

type HeaderType = {}

const Header: FC<HeaderType> = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    let photos = useTypedSelector(state => state.Photos.photos)
    let isPending = useTypedSelector(state => state.Photos.isPending)
    let currentPage = useTypedSelector(state => state.Photos.currentPage)
    let isSlideShow = useTypedSelector(state => state.Photos.isSlideShow)
    let currentPhoto = useTypedSelector(state => state.Photos.currentPhoto)

    useEffect(() => {
        if (!currentPage) dispatch(setCurrentPage(1))
        if (!currentPage) return
        if (photos && isPending) return;
        dispatch(fetchPhotos(currentPage))

    }, [dispatch, currentPage])


    const SetCurrentPhoto = (id: number): void => {
        dispatch(setCurrentPhoto(id))
    }

    const ToHomePage = (): void => {
        dispatch(toggleIsSlideShow(false))
        router.push('/').then()
    }
    const ToPhotoPage = () => {
        dispatch(toggleIsSlideShow(!isSlideShow))
        router.push(`/photos/${currentPhoto.PhotoId ? currentPhoto.PhotoId : 1}`).then()
    }
    useEffect(() => {
        if (!isSlideShow) return
        if (!currentPhoto.PhotoId) SetCurrentPhoto(1)
        let interval = setInterval(() => {
            SetCurrentPhoto(currentPhoto.PhotoId + 1)
        }, 2500)
        return () => clearInterval(interval)

    }, [dispatch, isSlideShow, currentPhoto])
    return <HeaderWrapper className='header__wrapper'>
        <div className="header__container">
            <div onClick={ToHomePage} className='logo-cont'>
                <Image src={logo}/>
            </div>
            <div onClick={() => ToPhotoPage()} className='slideShow-cont'>
                <span className='slideShow-text'>{isSlideShow ? 'STOP SLIDESHOW' : 'START SLIDESHOW'}</span>
            </div>
        </div>
    </HeaderWrapper>
};
export default Header;
const HeaderWrapper = styled.header`
  border-bottom: gray 1px solid;
  height: 100px;

  .header__container {
    padding: 20px 0;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: 50px;
    row-gap: 5px;

    .logo-cont {
      cursor: pointer;
      width: 160px;
    }

    .slideShow-cont {
      color: #626262;
      transition: .5s;


      &:hover {
        color: black;
      }

      .slideShow-text {
        cursor: pointer;
        letter-spacing: 2px;
        font-size: ${Rem(15)};
        font-weight: 500;
      }
    }
  }
`