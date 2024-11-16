import connectionFont from "../../assets/connectionFont.jpeg";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { googleRedirect, githubRedirect } from "@/lib/config";
import AuthButton from "./AuthButton";
import Separate from "./Separate";

function MobileView() {
  return (
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
  );
}

export default MobileView;
