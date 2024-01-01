/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
  faPython,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const aboutArray = 'ALBUM'.split('')
 
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={aboutArray}
              idx={15}
            />
          </h1>
          <p>
            여기는 앨범자리
          </p>
        </div>

        
        {/* 1. 갤러리 리스트에 대한 요청? API를 노드js 로 보내기 
            2. 경로를 정하기 전에 갤러리가 보이나? -> 지정된 경로에 해당파일이 없다고 에러처리
            3. 파이썬 실행되는 코드 (노드로연결)
            4. 파이썬에서 받아오는데이터를 외부로 보내주는 코드 (터미널에 ㄷ콘솔로 띄우듯이 그대로 웹으로)
            5. 데이터명이 들어오면 기존경로 +/+ 데이터명 = 경로가되듯이 만들어짐
            6. 이미지태그 소스에 박아버렷*/} 
      </div> 
      <Loader type="pacman" />
    </>
  )
}

export default About
