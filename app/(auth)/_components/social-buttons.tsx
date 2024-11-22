import React from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import GoogleIcon from "@/public/google.svg";

const SocialButtons: React.FC = () => {
  return (
    <>
      <Button
        className="bg-white text-black"
        endContent={<Image alt="" className="w-4 h-4" src={GoogleIcon} />}
        name="action"
        type="submit"
        value="google"
      >
        Continue with Google
      </Button>
      <Button
        endContent={<FontAwesomeIcon icon={faGithub} />}
        name="action"
        type="submit"
        value="github"
      >
        Continue with GitHub
      </Button>
    </>
  );
};

export default SocialButtons;
