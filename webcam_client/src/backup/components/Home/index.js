import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
// import AnimatedLetters from '../AnimatedLetters'
// import LogoTitle from '../../assets/images/logo-s.png'
import Logo from './Logo'
import './index.scss'
import axios from 'axios'; //엑시오스 모듈 불러오기 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  // const nameArray = 'udip'.split('')
  // const jobArray = 'Blockchain Developer'.split('')
  // const interestArray = 'Ethical Hacker'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const path = () => {
    let pathButton = document.getElementById("pathButton");
    pathButton.click();
    // alert("경로를 선택하세요");
  }
  const pathcode = async ()=> {
    console.log("필터링 조건걸고(정상적인 path값), 해당 경로를 저장하는 함수를 만들거임"); // 가능만들어야함
    
    let pathValue = document.getElementById("pathButton").value; // 경로값
    console.log(pathValue);

    //엑시오스
    try {
      const response = await axios.post('/path', { data: pathValue });
       //어웨잇 오른쪽 함수 수행이 끝낼때까지 잠깐 기다림
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);
    }

    
    // const history = useNavigate();
    // history('/contact');
    
    // /contact
  }

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>Automatic CAMERA</span>
            <br />
          </h1>
          <h2>
          object recognition + hands FREE!
          </h2>
          <input type="file" onChange={pathcode} className="file-input" id="pathButton"/> {/*값이 체인지되는 순간 작동*/}
          <Link to="" onClick={path} className="flat-button"> {/*클릭되는 순간 작동*/}
          📩 Set save path
          </Link>
        </div>
      </div>

      <div className="logoImage">
        <Logo />
      </div>


      <Loader type="pacman" />
    </>
  )
}

export default Home
