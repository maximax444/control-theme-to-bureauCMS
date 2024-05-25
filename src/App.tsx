import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
import './App.css'
import { getPages } from './http/setupApi'
import HTMLReactParser from "html-react-parser";

function App() {
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState([]);
  const [content, setContent] = useState("");

  const getAllPages = async () => {
    const resp = await getPages().catch((err) => {
      console.log(err);

    })
    if (resp && resp.status == 200) {
      setPages(resp.data)
    }
  }
  const getCurrPage = () => {
    pages.forEach(page => {
      if (page?.path == window.location.pathname) {
        setContent(page?.frontend)
      }
    });
  }
  useEffect(() => {
    getAllPages()
  }, [])
  useEffect(() => {
    getCurrPage();
  }, [pages, count])
  useEffect(() => {
    let links = document.querySelectorAll(".header a");
    links.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.replaceState(null, "", el.getAttribute("href"))
        setCount(count + 1)
      })
    })
  }, [content])
  return (
    <>
      {count}
      {HTMLReactParser(content)}
    </>
  )
}

export default App
