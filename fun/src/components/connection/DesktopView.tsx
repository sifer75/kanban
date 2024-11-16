import connectionFont from "../../assets/connectionFont.jpeg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { googleRedirect, githubRedirect } from "@/lib/config";
import AuthButton from "./AuthButton";
import Separate from "./Separate";

function DesktopView() {
  return (
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
          <AuthButton
            onClick={() => (window.location.href = googleRedirect)}
            label="Gmail"
            iconSrc={google}
          />
          <Separate />
          <AuthButton
            onClick={() => (window.location.href = githubRedirect)}
            label="Github"
            iconSrc={github}
          />
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
