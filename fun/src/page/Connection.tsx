import { Button } from "@/components/ui/button";
import google from "../../src/assets/google.svg";
import github from "../../src/assets/github.svg";
import { useNavigate } from "react-router-dom";
import connectionFont from "../assets/connectionFont.jpeg";
import { useEffect, useState } from "react";
import { BACKEND_HOST } from "@/lib/config";
function Connection() {
  const navigate = useNavigate();
  const githubRedirect = `http://127.0.0.1:3333/github/redirect`;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const appScreen = windowWidth < 640;
  return (
    <>
      {appScreen ? (
        <div
          className="w-screen h-screen flex flex-col px-10"
          style={{
            backgroundImage: `url(${connectionFont})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl w-full flex justify-center mt-32 mb-4">
            Créer un compte
          </h1>
          <p className="text-xs whitespace-nowrap text-gray-500 flex justify-center w-full ">
            Choisissez votre méthode d’authentification
          </p>
          <div className="flex flex-col items-center justify-center flex-grow gap-10 mb-20">
            <Button
              onClick={() => navigate("/workspace")}
              className="w-full bg-white border text-back text-base border-gray-300 rounded-md"
            >
              <img className="h-6 w-6 mr-2" src={google} alt="google"></img>
              Gmail
            </Button>
            <div className="flex justify-around w-full">
              <div className="flex items-center w-full">
                <div className="flex-grow h-[1px] bg-gray-300 mt-0.5"></div>
                <span className="px-2 text-sm text-gray-500">
                  ou continuez avec
                </span>
                <div className="flex-grow h-[1px] bg-gray-300 mt-0.5"></div>
              </div>
            </div>
            <Button
              onClick={() => (window.location.href = githubRedirect)}
              className="w-full bg-white border text-back text-base border-gray-300 rounded-md"
            >
              <img className="h-6 w-6 mr-2" src={github} alt="google"></img> Git
              Hub
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex">
          <img src={connectionFont} className="w-1/2 h-full object-cover"></img>
          <div className="w-1/2 bg-white flex items-center justify-center flex-col gap-10">
            <div className="mb-16">
              <h1 className="flex justify-center text-3xl mb-2 md:text-4xl lg:text-5xl">
                Créer un compte
              </h1>
              <p className="text-sm lg:text-md text-gray-500 flex justify-center">
                Choisissez votre méthode d’authentification
              </p>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-5 px-10 sm:px-16 md:px-20 lg:px-28">
              <Button
                onClick={() =>
                  (window.location.href = `http://${BACKEND_HOST}:3333/google/redirect`)
                }
                className="w-full bg-white border text-back text-base border-gray-300 rounded-md"
              >
                <img className="h-6 w-6 mr-2" src={google} alt="google"></img>
                Gmail
              </Button>
              <div className="flex justify-around w-full">
                <div className="flex items-center w-full">
                  <div className="flex-grow h-[1px] bg-gray-300 mt-0.5"></div>
                  <span className="px-2 text-xs md:text-sm text-gray-500">
                    ou continuez avec
                  </span>
                  <div className="flex-grow h-[1px] bg-gray-300 mt-0.5"></div>
                </div>
              </div>
              <Button
                onClick={() => (window.location.href = githubRedirect)}
                className="w-full bg-white border text-back text-base border-gray-300 rounded-md"
              >
                <img className="h-6 w-6 mr-2" src={github} alt="google"></img>{" "}
                GitHub
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Connection;
