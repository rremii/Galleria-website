import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import styled, {skeletonLoading} from "styled-components";
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore";
import {fetchPhotos, setCurrentPage, setCurrentPhoto} from "../../../store/PhotosSlice";
import {photosAPI} from "../../../api/api";
import {useRouter} from "next/router";


type HomeType = {}

const Home: FC<HomeType> = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    let photos = useTypedSelector(state => state.Photos.photos)
    let isPending = useTypedSelector(state => state.Photos.isPending)
    let currentPage = useTypedSelector(state => state.Photos.currentPage)
    ////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////
    let boxDivEl = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!boxDivEl?.current?.clientWidth) return
        if (boxDivEl?.current?.clientWidth > 890) setRowAmount(3)
        if (boxDivEl?.current?.clientWidth < 890 && boxDivEl?.current?.clientWidth > 610) setRowAmount(2)
        if (boxDivEl?.current?.clientWidth < 610) setRowAmount(1)
    }, [boxDivEl?.current?.clientWidth])
    let [rowAmount, setRowAmount] = useState(3)
    ///////////////////////////////////////////////////////////////////
    let row1 = useRef<HTMLDivElement>(null)
    let row2 = useRef<HTMLDivElement>(null)
    let row3 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const MainWrapper = document?.querySelector('.MainWrapper')
        if (MainWrapper) {
            MainWrapper?.addEventListener('scroll', (e) => {
                let divTarget = e?.target as HTMLDivElement
                setScrollY(divTarget.scrollTop)
            })
            const scroll = MainWrapper?.getBoundingClientRect().top
            setScrollY(scroll ? scroll : 0)
        }
        return MainWrapper?.removeEventListener('scroll', (e) => {
            let divTarget = e?.target as HTMLDivElement
            setScrollY(divTarget.scrollTop)
        })
    }, [])
    let [scrollY, setScrollY] = useState(0)
    useEffect(() => {
        if (!currentPage) return
        let height1 = row1?.current?.offsetHeight
        let height2 = row2?.current?.offsetHeight
        let height3 = row3?.current?.offsetHeight
        if (height1) {
            if (height1 - 400 < scrollY) dispatch(setCurrentPage(currentPage + 1))
        }
        if (height2) {
            if (height2 - 400 < scrollY) dispatch(setCurrentPage(currentPage + 1))
        }
        if (height3) {
            if (height3 - 400 < scrollY) dispatch(setCurrentPage(currentPage + 1))
        }
    }, [scrollY])

    //////////////////////////////////////////////////////////////////////////
    let firstRow = ['1', '4', '7']
    let secondRow = ['2', '5', '8']
    let thirdRow = ['3', '6', '9']
    if (rowAmount === 3) {
        firstRow = ['1', '4', '7']
        secondRow = ['2', '5', '8']
        thirdRow = ['3', '6', '9']
    }
    if (rowAmount === 2) {
        firstRow = ['1', '3', '5', '7', '9']
        thirdRow = ['2', '4', '6', '8', '10']
    }
    if (rowAmount === 1) {
        firstRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
    ///////////////////////////////////////////////////////////////////
    const ToPhotoPage = (id: number) => {
        dispatch(setCurrentPhoto(id))
        router.push(`/photos/${id}`).then()
    }
    return <HomeWrapper isLoading={true} className='home__wrapper'>
        <div ref={boxDivEl} className="home__container">
            <div ref={row1} className="row">
                {photos.map((photo, i) => {
                    let index = String(i).slice(-1) as string
                    const isFirstRow = (index: string): boolean => firstRow.some((el) => el === index)
                    if (isFirstRow(index))
                        return <div onClick={() => ToPhotoPage(i)} key={i} className="card-cont">
                            <img alt={''} src={photo.urls.regular}/>
                        </div>
                })}
                <div className="skeleton-cell1"/>
                <div className="skeleton-cell2"/>
                <div className="skeleton-cell3"/>
                <div className="skeleton-cell4"/>
                <div className="skeleton-cell5"/>
            </div>
            <div ref={row2} className="row">
                {photos.map((photo, i) => {
                    let index = String(i).slice(-1) as string
                    const isSecondRow = (index: string): boolean => secondRow.some((el) => el === index)
                    if (isSecondRow(index))
                        return <div onClick={() => ToPhotoPage(i)} key={i} className="card-cont">
                            <img alt={''} src={photo.urls.regular}/>
                        </div>
                })}
                <div className="skeleton-cell1"/>
                <div className="skeleton-cell2"/>
                <div className="skeleton-cell3"/>
                <div className="skeleton-cell4"/>
                <div className="skeleton-cell5"/>
            </div>
            <div ref={row3} className="row">
                {photos.map((photo, i) => {
                    let index = String(i).slice(-1) as string
                    const isThirdRow = (index: string): boolean => thirdRow.some((el) => el === index)
                    if (isThirdRow(index))
                        return <div onClick={() => ToPhotoPage(i)} key={i} className="card-cont">
                            <img alt={''} src={photo.urls.regular}/>
                        </div>
                })}
                <div className="skeleton-cell1"/>
                <div className="skeleton-cell2"/>
                <div className="skeleton-cell3"/>
                <div className="skeleton-cell4"/>
                <div className="skeleton-cell5"/>
            </div>


        </div>
    </HomeWrapper>
};
export default Home;
const HomeWrapper = styled.div<skeletonLoading>`
  padding-top: 35px;
  padding-bottom: 350px;
  overflow: hidden;

  .home__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-auto-rows: min-content;
    gap: 20px;

    .row:nth-child(2) {
      @media screen and (max-width: 890px) {
        display: none;
      }
    }

    .row:nth-child(3) {
      @media screen and (max-width: 610px) {
        display: none;
      }
    }

    .row {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 0;
      height: min-content;


      .card-cont {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: min-content;
        cursor: pointer;

        img {
          width: 100%;
          filter: grayscale(0.7);
          transition: .5s;

          &:hover {
            filter: grayscale(0);

          }
        }
      }

      .skeleton-cell1,
      .skeleton-cell2,
      .skeleton-cell3,
      .skeleton-cell4,
      .skeleton-cell5 {
        z-index: 1;
        display: ${({isLoading}) => isLoading ? 'block' : 'none'};
        content: '';
        position: absolute;
        width: 100%;
        height: 600px;
        background-color: rgba(98, 98, 98, 0.26);
        left: 0;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0);
          box-shadow: #ffffff 0 0 50px 20px;
          animation: slide-right 2s infinite ease-in-out;
        }

        @keyframes slide-right {
          0% {
            left: -10%;
          }
          100% {
            left: 110%;
          }
        }
      }

      .skeleton-cell1 {
        top: calc(100% + 20px);
      }

      .skeleton-cell2 {
        top: calc(100% + 640px);
      }

      .skeleton-cell3 {
        top: calc(100% + 1260px);
      }

      .skeleton-cell4 {
        top: calc(100% + 1880px);
      }

      .skeleton-cell5 {
        top: calc(100% + 2500px);
      }
    }
  }
`